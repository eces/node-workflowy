const url = require('url')
const debug = require('debug')('node-workflowy:client')

class WorkflowyList {
  constructor(v) {
    this.id = v.id
    this.name = v.nm || v.name
    this.note = v.no || v.note
    this.is_completed = Boolean(v.cp) || v.is_completed
    this.children = (v.ch || v.children || []).map(e => {
      return new WorkflowyList(e)
    })
  }
}

class WorkflowyClient {
  constructor(opt = {}) {
    this.request = require('request-promise').defaults({
      timeout: opt.timeout || 10000,
      jar: true,
    })
  }

  async auth(username, password) {
    if (!this.is_logged) {
      throw new Error('not implemented')
    }
    return this
  }

  async findList(projectId) {
    throw new Error('not implemented')
  }

  async findSharedList(projectId) {
    throw new Error('not implemented')
  }

  async findUrl(full_url) {
    const urlObj = url.parse(full_url)
    debug(urlObj)
    if (urlObj.pathname.startsWith('/s/')) {
      // secret link
    } else {
      if (!this.is_logged) {
        throw new Error('not authorized yet')
      }
    }
    // init session id
    await this.request.get({
      uri: full_url,
    })
    const json = await this.request({
      uri: `https://workflowy.com/get_initialization_data`,
      method: 'get',
      qs: {
        share_id: urlObj.pathname.replace('/s/', ''),
        client_version: 20
      },
      headers: {
        'user-agent': 'https://github.com/eces/node-workflowy (I Love Workflowy)'
      },
      json: true
    });
    debug(json)

    json.projectTreeData.mainProjectTreeInfo.rootProject.ch = 
      (json.projectTreeData.mainProjectTreeInfo.rootProjectChildren || []).map(e => {
        return new WorkflowyList(e)
      })

    const list = new WorkflowyList(json.projectTreeData.mainProjectTreeInfo.rootProject)    
    return list
  }
}
module.exports = WorkflowyClient
module.exports.WorkflowyList = WorkflowyList