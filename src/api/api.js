import axios from '@/plugins/axios.js'

/**
* API calls to server
*/
export function getDocuments (searchString, docquery) {
  if (searchString) {
    searchString = searchString.split(' ').join('%26')
    return axios.get('document?select=id,title,date,subject,sign,doctype,docnum,created,modified&limit=10&or=(title.eq.' +
      searchString + ',docnum.fts.{' + searchString + '},body.fts.{' + searchString + '})&' + docquery,
      {
        headers: {
          'Prefer': 'count=exact'
        }
      })
  } else {
    return axios.get('document?select=id,title,date,subject,sign,doctype,docnum,created,modified&limit=10&' + docquery, {
      headers: {
        'Prefer': 'count=exact'
      }
    })
  }
}

export function getAllDocumentsID (searchString, docquery) {
  if (searchString) {
    return axios.get('document?select=id&or=(title.eq.' + searchString + ',docnum.fts.{' +
      searchString + '},body.fts.{' + searchString + '})' + docquery)
  } else {
    return axios.get('document?select=id&' + docquery)
  }
}

export function getDocument (docPK) {
  return axios.get('document?id=eq.' + docPK)
}

export function getSignList () {
  return axios.get('document?select=sign&')
}

/**
* Calls to github
*/

export function getImageResource (title, filename) {
  var githuburl = 'https://raw.githubusercontent.com/hadrianpaulo/project_deathstar/master/ETL/finalized_dataset/'

  return (githuburl + title.substring(0, 4) + '/' + title + '/' + filename)
}

/**
* Calls to local
*/
export function getPdf (doc) { // by PK
  var githuburl = '../../static/pdfs/'
  return (githuburl + doc + '.pdf')
}
