<template>
    <div id="wrapper">
        <div class="alert alert-danger error" v-if="errorMessage">
            {{ errorMessage }}
        </div>

        <!-- Page Content -->
        <div id="page-wrapper">
          <div class="container-fluid doc-preview" v-if="doc">
              <div class="preview-buttons">
                  <a id="zoom-out-button" v-on:click="zoomOut()">
                      <icon name="search-minus"></icon>
                  </a>
                  <a id="zoom-in-button" v-on:click="zoomIn()">
                      <icon name="search-plus"></icon>
                  </a>
                  <a id="download-button" v-on:click="download()">
                      <icon name="download"></icon>
                  </a>
              </div>
              <div v-bind:style="{fontSize: Math.round(15 * zoomLevel) + 'px'}" id="zoom-wrapper">
                  <div class="doc-header" v-bind:style="{fontSize: 20 * zoomLevel + 'px'}">
                      <img id="doh-logo" src="../static/doh_logo.png" alt="DOH logo" v-bind:style="{fontSize: Math.round(20 * zoomLevel) + 'px'}">
                      <div class="header-title">
                          <p>Republic of the Philippines</p>
                          <p>Department of Health</p>
                          <strong>OFFICE OF THE SECRETARY</strong>
                      </div>
                  </div>

                  <br>

                  <div class="doc-date pull-right">
                      {{ doc.date | longdate }}
                  </div>

                  <br>

                  <div class="doc-type">
                      {{ doc.doctype }}
                  </div>

                  <div class="doc-num">
                      {{ doc.docnum }}
                  </div>

                  <br>

                  <div class="doc-subject">
                      {{ doc.subject}}
                      <br>
                  </div>

                  <div class="doc-body" v-html="doc.body">
                  </div>

                  <br>
                  <div class="doc-signed pull-right" >
                      <div class="doc-sign">
                          {{ doc.sign }}
                          
                      </div>

                      <div class="doc-sign-title">
                          {{ doc.signtitle}}
                      </div>

                  </div>
                  <div class="doc-annex" v-html="annex">
                  </div>
                  <!-- /.row -->
              </div>
               <!-- /#zoom-wrapper -->
          </div>
        <!-- /.container-fluid -->
        </div>
        <!-- /#page-wrapper -->
    </div>
</template>

<script>
// icon imports
import 'vue-awesome/icons/search-plus'
import 'vue-awesome/icons/search-minus'
import 'vue-awesome/icons/download'

import collapse from 'uiv/src/components/collapse/Collapse.vue'
import icon from 'vue-awesome/components/Icon'

import { getDocument } from '@/api/api'
import { getImageResource } from '@/api/gitresource'

export default {
  components: {
    collapse,
    icon
  },
  head: {
  },
  data: function () {
    return {
      zoomLevel: 1,
      doc: false,
      annex: '',
      errorMessage: false
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchDocument'
  },
  created: function () {
    this.fetchDocument()
  },
  methods: {
    zoomIn: function (event) {
      console.log('zoom in')
      if (this.zoomLevel < 5) { // maximum 50
        this.zoomLevel = this.zoomLevel + 0.3
      }
    },
    zoomOut: function (event) {
      console.log('zoom out')
      if (this.zoomLevel > 0.2) { // minimum 5
        this.zoomLevel = this.zoomLevel - 0.3
      }
    },
    download: function () {
      alert('download')
    },
    fetchDocument: function () {
      let document = this.$route.params.id
      getDocument(document).then(res => {
        if (res.data.hasOwnProperty('0')) {
          this.doc = res.data['0']
          this.annex = ''

          if (this.doc.raw_body.image.hasOwnProperty('0')) {
            let length = Object.keys(this.doc.raw_body.image).length
            let images = this.doc.raw_body.image

            for (let i = 0; i < length; i++) {
              let imagesrc = getImageResource(this.doc.title, images[i].text)

              if (images[i].line_num > this.doc.raw_body.signtitle.line_num) { // need to access it as a string
                this.annex += "<img class='doc-image' src='" + imagesrc + "'>"
              } else {
                this.doc.body = this.insert_image(this.doc.body, parseInt(this.doc.raw_body.body.line_num), parseInt(images[i].line_num), "<img src='" + imagesrc + "'>")
              }
            }
          }
        } else {
          this.errorMessage = 'Document does not exist'
          this.doc = false
        }
      }).catch(error => {
        this.errorMessage = 'There was an error communicating with the server. Please refresh the page.'
        this.doc = false
        console.log(error)
      })
    },
    insert_image: function (str, startline, insertline, image) { // inserting image in body
      var delim = '\n'
      var tokens = str.split(delim)
      tokens.splice(insertline - startline + 1, 0, image)
      tokens = tokens.map(i => i + '\n')
      return tokens.join('')
    }
  }
}
</script>

<style>
#doh-logo{
  float:left;
  height:100px;
  width:100px;
}

#page-wrapper .doc-preview{
  background-color: #FFFFFF;
  padding:50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-family: Garamond,serif;
  word-wrap: break-word;
}

#page-wrapper .header-title {
  text-align: center;
  margin: auto;
  width: 80%;
  padding: 10px;
}

#page-wrapper .header-title > p {
  margin:0;
}

#page-wrapper .doc-subject{
  font-weight:bold;
}

#page-wrapper .doc-body{
  white-space: pre-line;
}

#page-wrapper .doc-sign{
  font-weight:bold;
}

#page-wrapper .doc-signed .doc-sign-title{
  text-align:center;
}

#page-wrapper .doc-image{
  width:100%;
}

#page-wrapper .preview-buttons{
  top:100px;
  right: 50px;
  position: fixed;
  background-color: rgba(229,229,229, 0.2);
  border-radius: 30px;
  padding: 5px
}

#page-wrapper .preview-buttons:hover{
  background-color: rgba(229,229,229, 0.6);
}

#page-wrapper .preview-buttons > a{
  margin:5px;
  border-color: transparent;
  opacity:.1;
  color: #000000;
  padding:5px;
  cursor:pointer;
}

#page-wrapper .preview-buttons > a .fa-icon{
  width: 30px;
  height: 40px;
}

#page-wrapper .preview-buttons > a:hover{
  opacity:.6;
}

#page-wrapper .preview-buttons > a:active{
  opacity:.5;
  transition: opacity .5;
}

.preview-buttons a#download-button {
  margin-left:20px;
}

</style>
