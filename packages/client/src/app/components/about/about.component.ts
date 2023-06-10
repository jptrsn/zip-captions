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
      heading: 'What is Zip Captions?',
      body: `Zip Captions is a tool that will generate speech-to-text results for a given input device such as your machine's microphone.`
    },
    {
      heading: 'Why?',
      body: `Converting audio to text in real-time can make life more accessible. We aim to do this for everyone for free, as simply as possible.`
    },
    {
      heading: 'Who are you?',
      body: `We are a pair of educators and coders who believe that technology should be accessible, and that accessibility does not exist behind a paywall.`
    },
    {
      heading: 'How much?',
      body: `The core functionality will always be free. We aim to make as much of the tool as free as possible. However, in some cases, we may ask for money to help offset project costs.`
    },
    {
      heading: 'How?',
      body: 'Through advancements in browser technology, as well as some technical tricks, we aim to keep costs as minimal as possible, in order to make the tool as accessible as possible.'
    }
  ]
}
