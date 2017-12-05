import axios from '@/plugins/axios.js'

export function getDocuments (searchString, docquery) {
  if (searchString) {
    return axios.get('document?select=id,title,date,subject,sign,doctype,docnum,created,label(*),modified&limit=10&or=(docnum.@@.{' +
      searchString + '},body.@@.{' + searchString + '})' + docquery,
      {
        headers: {
          'Prefer': 'count=exact'
        }
      })
  } else {
    return axios.get('document?select=id,title,date,subject,sign,doctype,docnum,created,label(*),modified&limit=10&' + docquery, {
      headers: {
        'Prefer': 'count=exact'
      }
    })
  }
}

export function getAllDocumentsID (searchString, docquery) {
  if (searchString) {
    return axios.get('document?select=id&or=(docnum.@@.{' +
      searchString + '},body.@@.{' + searchString + '})' + docquery)
  } else {
    return axios.get('document?select=id&' + docquery)
  }
}

export function getDocument (docPK) {
  return axios.get('document?id=eq.' + docPK)
}
