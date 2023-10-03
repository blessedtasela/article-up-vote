import {
  Component,
  Input,
  HostBinding,
  OnInit
} from '@angular/core';
import { ArticleService, Articles, startCounting } from './article.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  header = 'Berliz Article Voting Blog';
  articles: Articles[];
  loggedIn: boolean = false;
  username: string = '';
  hideUsername: boolean = false;
  currentTime: any;
  loggedOut: any;
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

  }

  login(usernameInput: HTMLInputElement): boolean {
    const username = usernameInput.value.trim();
    this.articleService.login(username);
    if (this.articleService.getCurrentUser != null) {
      this.loggedIn = true;
    }
    this.username = this.articleService.username;
    usernameInput.value = ''
    this.currentTime = new Date;
    startCounting(this.currentTime);
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

}
