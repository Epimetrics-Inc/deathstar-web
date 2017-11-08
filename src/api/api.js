import axios from '@/plugins/axios.js'

export function getDocuments (docquery) {
  return axios.get('document?select=id,title,date,subject,sign,doctype,docnum,created,label(*),modified&limit=10&' + docquery, {
    headers: {
      'Prefer': 'count=exact'
    }
  })
}

export function getDocument (docPK) {
  return axios.get('document?id=eq.' + docPK)
}
