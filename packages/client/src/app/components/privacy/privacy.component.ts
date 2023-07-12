import { Component } from '@angular/core';
import { PolicySection } from '../../models/app.model';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent {
  public contents: PolicySection[] = [
    { 
      title: 'PRIVACY.1',
      sections: [
        { text: 'PRIVACY.1.1'},
        { text: 'PRIVACY.1.2'}
      ]
    },
    {
      title: "PRIVACY.2",
      sections: [
        {text: 'PRIVACY.2.1'}
      ]
    },
    {
      title: "PRIVACY.3",
      sections: [
        { text: 'PRIVACY.3.1',
          list: [
            'PRIVACY.3.1a', 
            'PRIVACY.3.1b',
            'PRIVACY.3.1c',
            'PRIVACY.3.1d',
            'PRIVACY.3.1e',
            'PRIVACY.3.1f',
            'PRIVACY.3.1g',
            'PRIVACY.3.1h',
            'PRIVACY.3.1i'
          ]
        },
        { text: 'PRIVACY.3.2' }
      ]
    },
    {
      title: 'PRIVACY.4',
      sections: [
        { text: 'PRIVACY.4.1' },
        { 
          text: 'PRIVACY.4.2',
          list: [
            'PRIVACY.4.2a', 
            'PRIVACY.4.2b',
            'PRIVACY.4.2c',
            'PRIVACY.4.2d',
            'PRIVACY.4.2e',
            'PRIVACY.4.2f',
            'PRIVACY.4.2g',
            'PRIVACY.4.2h',
            'PRIVACY.4.2i',
            'PRIVACY.4.2j',
            'PRIVACY.4.2k',
            'PRIVACY.4.2l',
            'PRIVACY.4.2m',
            'PRIVACY.4.2n'
          ]
        },
        { text: 'PRIVACY.4.3' },
        { text: 'PRIVACY.4.4' },
        { text: 'PRIVACY.4.5' },
        { text: 'PRIVACY.4.6' }
      ],
    },
    {
      title: 'PRIVACY.5',
      sections: [
        { text: 'PRIVACY.5.1' },
        { text: 'PRIVACY.5.2' },
        {
          text: 'PRIVACY.5.3',
          list: [
            'PRIVACY.5.3a',
            'PRIVACY.5.3b',
            'PRIVACY.5.3c',
            'PRIVACY.5.3d',
            'PRIVACY.5.3e'
          ]
        },
        { text: 'PRIVACY.5.4' },
      ]
    },
    {
      title: 'PRIVACY.6',
      sections: [
        { text: 'PRIVACY.6.1' },
        { text: 'PRIVACY.6.2' },
        { text: 'PRIVACY.6.3' },
        { text: 'PRIVACY.6.4' }
      ]
    },
    {
      title: 'PRIVACY.7',
      sections: [
        { text: 'PRIVACY.7.1' },
        { text: 'PRIVACY.7.2' },
        { 
          text: 'PRIVACY.7.3',
          list: ['PRIVACY.7.3a']
        },
        {
          text: 'PRIVACY.7.4',
          list: [
            'PRIVACY.7.4a',
            'PRIVACY.7.4b',
            'PRIVACY.7.4c',
          ]
        }
      ]
    },
    {
      title: 'PRIVACY.8',
      sections: [
        { text: 'PRIVACY.8.1' },
        { text: 'PRIVACY.8.2' },
        { text: 'PRIVACY.8.3' },
        { text: 'PRIVACY.8.4' },
        { text: 'PRIVACY.8.5' },
      ]
    },
    {
      title: 'PRIVACY.9',
      sections: [
        { text: 'PRIVACY.9.1' },
        { text: 'PRIVACY.9.2' },
        { text: 'PRIVACY.9.3' },
      ]
    },
    {
      title: 'PRIVACY.10',
      sections: [
        { 
          text: 'PRIVACY.10.1', 
          list: [
            'PRIVACY.10.1a',
            'PRIVACY.10.1b',
          ]
        },
        { text: 'PRIVACY.10.2' },
        { text: 'PRIVACY.10.3' }
      ]
    },
    {
      title: 'PRIVACY.11',
      sections: [
        { text: 'PRIVACY.11.1' },
        { text: 'PRIVACY.11.2' }
      ]
    },
    {
      title: 'PRIVACY.12',
      sections: [
        { text: 'PRIVACY.12.1' }
      ]
    },
    {
      title: 'PRIVACY.13',
      sections: [
        { text: 'PRIVACY.13.1' }
      ]
    }
  ];
}
