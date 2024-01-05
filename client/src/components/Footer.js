import '../styles/Footer.css'

const Navbar = ()=>{
    return(
        <footer class="footer">
      <div class="section__container footer__container">
        <div class="footer__col">
          <h3>Felicon</h3>
          <p>
           Felicopn offers a seamless and
            convenient way to find and book accommodations worldwide.
          </p>
          <p>
            Felicon aims to provide a stress-free experience for travelers
            seeking the perfect stay.
          </p>
        </div>
        <div class="footer__col">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Our Team</p>
          <p>Blog</p>
          <p>Book</p>
          <p>Contact Us</p>
        </div>
        <div class="footer__col">
          <h4>Legal</h4>
          <p>FAQs</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <div class="footer__col">
          <h4>Resources</h4>
          <p>Social Media</p>
          <p>Help Center</p>
          <p>Partnerships</p>
        </div>
      </div>
      <div class="footer__bar">
        Copyright © 2023 Web Design Mastery. All rights reserved.
      </div>
    </footer>
    )
}
export default Navbar;