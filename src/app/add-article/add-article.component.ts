import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Articles } from '../article/article.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {
  @HostBinding('attr.class') cssClass = 'row';
  article: Articles[] = [];
  @Output() add = new EventEmitter<{ title: HTMLInputElement, link: HTMLInputElement }>();


  constructor() {
  }

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    console.log(`Adding article. Title: ${title.value}, Link: ${link.value}`);
    this.article.push(new Articles(title.value, link.value, 0));

    if (title && link) {
      this.add.emit({ title, link });
    }
    title.value = '';
    link.value = '';
    return false;
  }


}
