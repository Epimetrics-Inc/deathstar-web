import { getDocuments, getDocument } from '@/api/api.js'

var sampleDocument = {
  'pk': 2029,
  'title': '1975_AO249',
  'date': '1975-06-27',
  'sign': 'CLEMENTE S. GATMAITAN, M.D., M.P.H.',
  'signtitle': 'Secretary of Health',
  'doctype': 'ADMINISTRATIVE ORDER',
  'docnum': 'No. 249 s. 1975',
  'label': null,
  'created': '2017-09-22T03:26:18.358531Z',
  'modified': '2017-09-22T03:26:18.358550Z',
  'body': '\nEffective July 1, 1975, the Chief, Davao General Hospital is hereby authorized, subject to the provisions of Rule XVI of the Revised Civil Service Rules, to approve after the words \'By authority of the Secretary of Health\' all applications for leaves of absence of officers and employees of the said hospital, provided their services can be spared without detriment to the interest of the public service, except as follows:\n\nA. Requests for commutation of salary incident to leave and\n\nB. Applications for leave without pay in excess of sixty (60) days, both of which shall be submitted to Regional Health Office No. XI for appropriate action.\n\nIn connection with the foregoing authority, the Hospital Chief concerned shall secure from the Department of Health, Manila, the leave credits of each and every personnel of his hospital. Applications for leave of absence of officers and employees of the Davao General Hospital received in the Department of Health before July 1, 1975 shall continue to be acted upon by the said Office, but those that may be submitted after that date should be returned to the hospital for action conformably with the terms of this Order.\n',
  'raw_body': {
    'signtitle': {
      'text': 'Secretary of Health',
      'line_num': 24
    },
    'docnum': {
      'text': 'No. 249 s. 1975',
      'line_num': 9
    },
    'doctype': {
      'text': 'ADMINISTRATIVE ORDER',
      'line_num': 8
    },
    'date': {
      'text': '1975-06-27',
      'line_num': 6
    },
    'subject': {
      'text': 'SUBJECT: Delegation of authority for the Chief, Davao General Hospital, to approve applications for leaves of absence of hospital personnel.',
      'line_num': 11
    },
    'body': {
      'text': '\nEffective July 1, 1975, the Chief, Davao General Hospital is hereby authorized, subject to the provisions of Rule XVI of the Revised Civil Service Rules, to approve after the words \'By authority of the Secretary of Health\' all applications for leaves of absence of officers and employees of the said hospital, provided their services can be spared without detriment to the interest of the public service, except as follows:\n\nA. Requests for commutation of salary incident to leave and\n\nB. Applications for leave without pay in excess of sixty (60) days, both of which shall be submitted to Regional Health Office No. XI for appropriate action.\n\nIn connection with the foregoing authority, the Hospital Chief concerned shall secure from the Department of Health, Manila, the leave credits of each and every personnel of his hospital. Applications for leave of absence of officers and employees of the Davao General Hospital received in the Department of Health before July 1, 1975 shall continue to be acted upon by the said Office, but those that may be submitted after that date should be returned to the hospital for action conformably with the terms of this Order.\n',
      'line_num': 13
    },
    'sign': {
      'text': 'CLEMENTE S. GATMAITAN, M.D., M.P.H.',
      'line_num': 23
    },
    'image': {}
  }
}

describe('api.js', done => {
  it('Get all documents', () => {
    getDocuments().then(res => {
      expect(res.data.count).to.least(2029)
      expect(res.data.results.length).to.be.least(10)
      expect(res.data.results[0].pk).to.equal(1230)
      done()
    }).then(done, done)
  })

  // it('Get a document', done => {
  //   getDocument(2029).then(res => {
  //     expect(res.data).to.equal(new Object(sampleDocument))
  //   }).then(done, done)
  // })
})

// TODO: error checking

