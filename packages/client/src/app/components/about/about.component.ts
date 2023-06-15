import { Component } from '@angular/core';

interface ParagraphText {
  heading: string;
  body: string;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  public contents: ParagraphText[] = [
    {
      heading: `ABOUT.h1`,
      body: `ABOUT.b1`
    },
    {
      heading: `ABOUT.h2`,
      body: `ABOUT.b2`
    },
    {
      heading: `ABOUT.h3`,
      body: `ABOUT.b3`
    },
    {
      heading: `ABOUT.h4`,
      body: `ABOUT.b4`
    },
    {
      heading: `ABOUT.h5`,
      body: `ABOUT.b5`
    }
  ]
}
