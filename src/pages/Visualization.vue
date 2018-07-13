<template>
    <div id="wrapper">

      <div class="container vis-instructions">
          <div class="page-header">
              <h1>How to generate a visualization using VOSviewer</h1>
              <i>
                  VOSviewer provides three visualizations of a map: The network visualization, the overlay visualization, and the density visualization. Zooming and scrolling functionality allows a map to be explored in full detail, which is essential when working with large maps containing thousands of items. In the visualization, the distance between the words approximately indicates the relatedness of the two words. In general, the closer two words are located to each other, the stronger their relatedness. The size of the word indicates the occurence count of the word in the documents.
              </i>
          </div>
          <ol>
              <li>
                 <a href="#download">Download VOSviewer</a>
              </li>
              <li>
                 <a href="#downloadfiles">Download VOSViewer files</a>
              </li>
              <li>
                 <a href="#openFiles">Open the files in VOSViewer</a>
              </li>
              <li>
                 <a href="#explore">Explore the Map</a>
              </li>
              <li>
                 <a href="#search">Search Items</a>
              </li>
          </ol>
          <div id="download">
              <h2>Download VOSviewer</h2>
              <p>
                  Download VOSViewer from the VOSviewer <a href="http://www.vosviewer.com/download">website</a>.
              </p>

              <img src="../static/vos_download.png">
          </div>

          <div id="downloadfiles">
              <h2>Download VOSviewer Files</h2>
              <p>
                  Download VOSViewer files generated from DoH AOs <a href="https://github.com/Epimetrics-Inc/project_deathstar/raw/master/analytics/voss_all_220917.zip">website</a> and unzip it.
              </p>
          </div>

          <div id="openFiles">
              <h2>Open the files in VOSViewer</h2>
              <p>
                Open the VOSViewer program.
              </p>
              <img src="../static/vos_open.png">
              <p>
                Click open on action panel                
              </p>
              <img src="../static/vos_open_file.png">
              <p>
                Select "voss_220917.txt" as the map file. Optionally, you can also select voss_net_220917.txt as your network file.
              </p>
              <img src="../static/vos_select_file.png">
              <p>
                Press "OK"                
              </p>
              <img src="../static/vos_select_ok.png">
              <p>
                This will load the map and network file.               
              </p>
              <img src="../static/vos_view_file.png">
          </div>

          <div id="explore">
              <h2>Explore the Map</h2>
              <p>
                Go to "Density visualization"
              </p>
              <img src="../static/vos_select_density.png">
              <p>
                  You can now scroll and zoom around the map.
              </p>
              <img src="../static/vos_density.png">
          </div>
          <div id="search">
              <h2>Search Items</h2>
              <p>
                Enter keyword you want to search to filter and double click the keyword you want to view in the map.
              </p>
              <img src="../static/vos_search.png">
          </div>
      </div>
    </div>
</template>

<style>
.vis-instructions div img{
  width:100%;
  max-width:1000px;
  margin:20px auto;
  display: block;
}
</style>