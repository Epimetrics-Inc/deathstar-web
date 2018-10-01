<template>
  <div id="wrapper" class="about">
    <div class="landing-content">
      <div class="col-md-offset-4 col-md-4">
        <br/>
        <br/>
        <h3>Comments or Suggestions?</h3>
        <br/>
        <form name="contact" method="POST" netlify>
          <div class="form-group">
            <label for="Name">Your Name:</label>
            <input type="text" name="name" class="form-control" />
          </div>
          <div class="form-group">
            <label for="email">Your E-Mail:</label>
            <input type="email" name="email" class="form-control" />
          </div>
          <div class="form-group">
            <label for="message">Your Message:</label>
            <input type="text" name="message" class="form-control" />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>