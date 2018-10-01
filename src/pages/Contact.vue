<template>
      <div>
        <h3>Comments or Suggestions?</h3>
        <form name="contact" method="POST" netlify>
            <label for="Name">Your Name:</label>
            <input type="text" name="name" />
            <label for="email">Your E-Mail:</label>
            <input type="email" name="email"/>
            <label for="message">Your Message:</label>
            <input type="text" name="message" />
          <button type="submit">Submit</button>
        </form>
      </div>
</template>