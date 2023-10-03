import {
  Component,
  Input,
  HostBinding,
  OnInit
} from '@angular/core';
import { ArticleService, Articles, getCurrentTime } from './article.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  countdownIntervalId: any;
  articles: Articles[];
  loggedIn: boolean = false;
  username: string = '';
  hideUsername: boolean = false;
  currentTime: any;
  loggedTime: any;
  loggedOut: any;
  loggedInDuration: string = '00h :00m :00s';
  countdownInterval: any;
  constructor(private modalService: NgbModal,
    public articleService: ArticleService) {
    this.articles = articleService.articles
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  ngOnInit(): void {
    if (this.articleService.getCurrentUser()) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false
    }
    this.startCountdown()
  }

  login(usernameInput: HTMLInputElement): boolean {
    const username = usernameInput.value.trim();
    this.articleService.login(username, new Date);

    if (this.articleService.getCurrentUser != null) {
      this.loggedIn = true;
    }
    this.username = this.articleService.username;
    usernameInput.value = ''
    return false;
  }

  logout(): boolean {
    this.articleService.logout()
    this.loggedIn = false;
    return false
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): void {
    console.log(`Adding article. Title: ${title.value}, Link: ${link.value}`);
    this.articles.push(new Articles(title.value, link.value, 0));
  }

  voteUp(article: Articles): boolean {
    article.voteUp();
    return false;
  }
  voteDown(article: Articles): boolean {
    if (article.votes > 0)
      article.voteDown();
    return false;
  }

  sortedArticles(): Articles[] {
    return this.articles.sort((a: Articles, b: Articles) => b.votes - a.votes);
  }

  toggleLoginVisibility(): void {
    this.loggedIn = !this.loggedIn;
  }

  handleSearchResults(results: Articles[]) {
    this.articles = results
  }

  ngOnDestroy() {
    clearInterval(this.countdownInterval);
  }

  startCountdown() {
    const loginTimeStr = this.articleService.getLoggedInDate();
    if (loginTimeStr) {
      const loginTime = new Date(loginTimeStr);
      this.loggedTime = getCurrentTime(loginTime);
      this.updateLoggedInDuration(loginTime);
      this.countdownInterval = setInterval(() => {
        this.updateLoggedInDuration(loginTime);
      }, 1000); // Update every second
    }
  }

  updateLoggedInDuration(loginTime: Date) {
    const currentTime = new Date();
    const elapsedTimeInSeconds = Math.floor(
      (currentTime.getTime() - loginTime.getTime()) / 1000
    );
    const hours = Math.floor(elapsedTimeInSeconds / 3600);
    const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
    const seconds = elapsedTimeInSeconds % 60;
    this.loggedInDuration = this.formatTime(hours, minutes, seconds);
  }

  formatTime(hours: number, minutes: number, seconds: number): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString());
    return pad(hours) + 'h: ' + pad(minutes) + 'm :' + pad(seconds) + 's';
  }
}
