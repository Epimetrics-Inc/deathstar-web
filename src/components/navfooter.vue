<template>
    <footer class="page-footer navbar-default">
        <div class="container-fluid">
            <div class="row">

                <!--First column-->
                <div class="col-sm-6">
                     © 2017 Copyright: <a href="http://www.epimetrics.com.ph"> EpiMetrics </a>
                </div>
                <!--/.First column-->

                <!--Second column-->
                <div class="col-sm-6 pull-right">
                    <div class="footer-links pull-right">
                      <router-link :to="{ name: 'visualization' }">How to generate visualization</router-link>
                      <router-link :to="{ name: 'about' }">About</router-link>
                      <router-link :to="{ name: 'contact' }">Contact Us</router-link>
                    </div>
                </div>
                <!--/.Second column-->
            </div>
        </div>
    </footer>
</template>
<style>
.page-footer {
  bottom: 0;
}

.page-footer .container-fluid {
  padding: 30px 20px;
}

.footer-links > a{
  padding: 0 20px
}
</style>