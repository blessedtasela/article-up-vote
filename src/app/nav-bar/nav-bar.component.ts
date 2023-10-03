import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService, Articles } from '../article/article.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
  @Output() loggedOut = new EventEmitter();
  @Output() searchEmit = new EventEmitter()
  articles: Articles[] = []
  constructor(private articleService: ArticleService) { }

  logout(): boolean {
    this.loggedOut.emit();
    return false
  }

  search(query: string) {
    query = query.trim().toLowerCase();
    let searchResults: Articles[] = [];

    if (query === '') {
      searchResults = this.articleService.articles;
    } else {
      searchResults = this.articleService.articles.filter((article: Articles) => {
        return article.title.toLowerCase().includes(query);
      });
    }
    this.searchEmit.emit(searchResults);
  }


}
