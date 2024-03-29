import { Component, Input, OnInit } from '@angular/core';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import * as AOS from 'aos';
import Typed, { TypedOptions } from 'typed.js';
// import Swiper from 'swiper';
import { AfterViewInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { PortfolioService } from 'src/app/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  @Input() details: any;

  options: any;

  toastr: any;

  message = '';

  emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  form = {
    name: null,
    email: null,
    subject: null,
    message: null
  }


  constructor(private portfolioService: PortfolioService) { }


  ngOnInit(): void {
    this.options = {
      strings: this.details.header.titles,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    };

    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    const typed = new Typed('.typed', this.options);
  }

  ngAfterViewInit(): void {
    const skilsContent = this.select('.skills-content');
    if (skilsContent) {
      const progress = this.select('.progress .progress-bar', true);
      progress.forEach((el: any) => {
        el.style.width = el.getAttribute('aria-valuenow') + '%'
      });
    }

    this.toastr = new bootstrap.Toast(<any>document.querySelector('.toast'), { autohide: false });

    let backtotop = this.select('.back-to-top');
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active');
        } else {
          backtotop.classList.remove('active');
        }
      }
      window.addEventListener('load', toggleBacktotop);
      this.onscroll(document, toggleBacktotop);
    }

    let navbarlinks = this.select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach((navbarlink: any) => {
        if (!navbarlink.hash) return
        let section = this.select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      })
    }
    window.addEventListener('load', navbarlinksActive);
    this.onscroll(document, navbarlinksActive);
  }

  onscroll(el: any, listener: any) {
    el.addEventListener('scroll', listener);
  }

  toggleNav() {
    this.select('body').classList.toggle('mobile-nav-active');
    const el = this.select('.mobile-nav-toggle');
    el.classList.toggle('bi-list');
    el.classList.toggle('bi-x');
  }

  select(el: string, all = false): any {
    el = el.trim()
    if (all) {
      return document.querySelectorAll(el);
    } else {
      return document.querySelector(el);
    }
  }

  sendMessage(item: any) {
    if (Object.values(this.form).filter((c: any) => !c).length) {
      this.message = 'Please fill all the fields!';
      this.toastr.show();
    } else if (!this.emailRegex.test((<any>this.form.email))) {
      this.message = 'Please enter a valid email address';
      this.toastr.show();
    } else {
      console.log(this.form);
      this.portfolioService.addMessage(this.form).subscribe((res) => {
        this.message = 'Hi ' + this.form.name + ' , I have received your message. Will respond soon!.';
        this.form.name = null;
        this.form.subject = null;
        this.form.email = null;
        this.form.message = null;
        this.toastr.show();
      }, (err) => {
        this.message = 'Hi ' + this.form.name + ' , There is an issue while sending your message. Please try again!'
        this.toastr.show();
      });
    }
    this.toastr.show();
  }

  closeToast() {
    this.message = '';
    this.toastr.hide();
  }
}
