<template>
    <footer class="page-footer navbar-default">
        <div class="container-fluid">
            <div class="row">

                <!--First column-->
                <div class="col-md-6">
                     © 2017 Copyright: <a> EpiMetrics </a>
                </div>
                <!--/.First column-->

                <!--Second column-->
                <div class="col-md-6 pull-right">
                    <div class="footer-links pull-right">
                      <a>How to generate visualization</a>
                      <router-link :to="{ name: 'about' }">About</router-link>
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