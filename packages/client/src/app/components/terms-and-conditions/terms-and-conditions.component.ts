import { Component } from '@angular/core';
import { PolicySection } from '../../models/app.model';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  public contents: PolicySection[] = [
    {
      title: 'TERMS.1',
      sections: [
        { text: 'TERMS.1.1' },
        { text: 'TERMS.1.2' },
        { text: 'TERMS.1.3' },
        { text: 'TERMS.1.4' },
        { text: 'TERMS.1.5' },
      ]
    },
    {
      title: 'TERMS.2',
      sections: [
        { text: 'TERMS.2.1'}
      ]
    },
    {
      title: 'TERMS.3',
      sections: [
        { text: 'TERMS.3.1' }
      ]
    },
    {
      title: 'TERMS.4',
      sections: [
        { text: 'TERMS.4.1' }
      ]
    },
    {
      title: 'TERMS.4',
      sections: [
        { 
          text: 'TERMS.5.1',
          list: [
            'TERMS.5.1.1',
            'TERMS.5.1.2',
            'TERMS.5.1.3',
            'TERMS.5.1.4',
            'TERMS.5.1.5',
            'TERMS.5.1.6',
          ]
        },
        {
          text: 'TERMS.5.2',
          list: [
            'TERMS.5.2.1',
            'TERMS.5.2.2',
            'TERMS.5.2.3',
            'TERMS.5.2.4',
            'TERMS.5.2.5',
            'TERMS.5.2.6',
            'TERMS.5.2.7',
            'TERMS.5.2.8',
            'TERMS.5.2.9',
          ]
        }
      ]
    },
    {
      title: 'TERMS.6',
      sections: [
        { text: 'TERMS.6.1' },
        { text: 'TERMS.6.2' }
      ]
    },
    {
      title: 'TERMS.7',
      sections: [
        { text: 'TERMS.7.1' }
      ]
    },
    {
      title: 'TERMS.8',
      sections: [
        { text: 'TERMS.8.1' }
      ]
    },
    {
      title: 'TERMS.9',
      sections: [
        { text: 'TERMS.9.1' },
        { text: 'TERMS.9.2' },
        { text: 'TERMS.9.3' },
        { text: 'TERMS.9.4' }
      ]
    },
    {
      title: 'TERMS.10',
      sections: [
        { text: 'TERMS.10.1' },
        { text: 'TERMS.10.2' },
        { text: 'TERMS.10.3' },
        { text: 'TERMS.10.4' },
        { text: 'TERMS.10.5' }
      ]
    },
    {
      title: 'TERMS.11',
      sections: [
        { text: 'TERMS.11.1' },
        { text: 'TERMS.11.2' }
      ]
    },
    {
      title: 'TERMS.12',
      sections: [
        { text: 'TERMS.12.1' },
        { text: 'TERMS.12.2' },
        { text: 'TERMS.12.3' }
      ]
    },
    {
      title: 'TERMS.13',
      sections: [
        { text: 'TERMS.13.1' },
        { text: 'TERMS.13.2' }
      ]
    },
    {
      title: 'TERMS.14',
      sections: [
        { text: 'TERMS.14.1' }
      ]
    },
    {
      title: 'TERMS.15',
      sections: [
        { text: 'TERMS.15.1' },
        { text: 'TERMS.15.2' },
        { text: 'TERMS.15.3' }
      ]
    },
    {
      title: 'TERMS.16',
      sections: [
        { text: 'TERMS.16.1' },
        { text: 'TERMS.16.2' }
      ]
    },
    {
      title: 'TERMS.17',
      sections: [
        { text: 'TERMS.17.1' }
      ]
    },
    {
      title: 'TERMS.18',
      sections: [
        { text: 'TERMS.18.1' }
      ]
    }
  ];
}
