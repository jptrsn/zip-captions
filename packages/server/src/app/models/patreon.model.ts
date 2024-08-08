export interface PatreonMembersCreateWebhookPayload extends PatreonWebhookData {
  attributes: {
    campaign_lifetime_support_cents: number;
    currently_entitled_amount_cents: number;
    email: string;
    full_name: string;
    is_follower: boolean;
    is_free_trial: boolean;
    last_charge_date: string | null;
    last_charge_status: string | null;
    lifetime_support_cents: number;
    next_charge_date: string | null;
    note: string;
    patron_status: string | null,
    pledge_cadence: string | null,
    pledge_relationship_start: string; // '2024-08-08T00:59:34.874+00:00',
    will_pay_amount_cents: number;
  }
}

export interface PatreonMembersUpdateWebhookPayload extends PatreonWebhookData {
  attributes: {
    access_expires_at: null;
    campaign_currency: string; // 'USD',
    campaign_lifetime_support_cents: number;
    campaign_pledge_amount_cents: number;
    full_name: string;
    is_follower: boolean;
    is_free_member: null,
    is_free_trial: null,
    last_charge_date: string; // '2014-04-01T00:00:00.000+00:00',
    last_charge_status: string; // 'Paid',
    lifetime_support_cents: number;
    patron_status: string; // 'active_patron',
    pledge_amount_cents: number;
    pledge_relationship_start: string; // '2014-03-14T00:00:00.000+00:00'
  }
}

export interface PatreonPledgeCreateWebhookPayload extends PatreonWebhookData {
  attributes: {
    amount_cents: number; // 250,
    created_at: string; // "2015-05-18T23:50:42+00:00",
    declined_since: string; // string | null;
    patron_pays_fees: boolean; //false,
    pledge_cap_cents: number; // null
  }
}

export interface PatreonPledgeUpdateWebhookPayload extends PatreonWebhookData {
  attributes: {
    access_expires_at: string | null;
    campaign_currency: string;
    campaign_lifetime_support_cents: number;
    campaign_pledge_amount_cents: number;
    full_name: string;
    is_follower: boolean;
    is_free_member: boolean;
    is_free_trial: boolean;
    last_charge_date: string; // '2014-04-01T00:00:00.000+00:00',
    last_charge_status: string; // 'Paid',
    lifetime_support_cents: number;
    patron_status: string; // 'active_patron',
    pledge_amount_cents: number;
    pledge_relationship_start: string; // '2014-03-14T00:00:00.000+00:00'
  }
}

interface PatreonWebhookData {
  id: string; //"1",
  relationships: {
    address: {
      data: null
    },
    card: {
      data: null
    },
    campaign: {
      data: {
        id: string;
        type: 'campaign';
      },
      links: {
        related: string;
      }
    },
    currently_entitled_tiers: {
      data: []
    },
    creator: {
      data: {
        id: string; // "1234567",
        type: string; // "user"
      },
      links: {
        related: string; // "https://www.patreon.com/api/user/1234567"
      }
    },
    patron: {
      data: {
        id: string; // "12345",
        type: string; // "user"
      },
      links: {
        related: string; // "https://www.patreon.com/api/user/12345"
      }
    },
    reward: {
      data: {
        id: string; // "123456",
        type: string; // "reward"
      },
      links: {
        related: string; // "https://www.patreon.com/api/rewards/123456"
      }
    }
  },
  type: string; // "pledge"
}

export interface PatreonWebhookPayload {
  data: PatreonWebhookData;
  included: Array<PatreonCampaignObject | PatreonUserObject>;
}

export interface PatreonCampaignObject {
  attributes: {
    avatar_photo_image_urls: {
      default: string; 
      default_small: string; 
      original: string; 
      thumbnail: string; 
      thumbnail_large: string; 
      thumbnail_small: string; 
    },
    avatar_photo_url: string; 
    campaign_pledge_sum: number;
    cover_photo_url: string;
    cover_photo_url_sizes: {
      large: string; 
      medium: string;
      small: string;
      xlarge: string;
      xsmall: string;
    },
    created_at: string; // 2023-09-10T20:17:08.000+00:00',
    creation_count: number; // 39,
    creation_name: string; //
    currency: string; // USD',
    discord_server_id: string; // 
    display_patron_goals: boolean; // false,
    earnings_visibility: string; // public',
    image_small_url: string; //
    image_url: string; // 
    is_charge_upfront: boolean; // ,
    is_charged_immediately: boolean; // ,
    is_monthly: boolean; // ,
    is_new_fandom: boolean; // ,
    is_nsfw: boolean; // ,
    is_plural: boolean; // ,
    main_video_embed: string; // '\n<iframe src="https://www.youtube.com/embed/{{ID}}" width="854" height="480" frameborder="0" scrolling="no" allowfullscreen="">\n</iframe>\n',
    main_video_url: string; //, ''
    name: string; 
    one_liner: string | null;
    outstanding_payment_amount_cents: 0,
    paid_member_count: number; 
    patron_count: number; 
    pay_per_name: string; 
    pledge_sum: number; 
    pledge_sum_currency: string; // USD',
    pledge_url: string; 
    published_at: string; 
    should_display_chat_tab: boolean; // ,
    summary: string; // html string
    thanks_embed: string | null;
    thanks_msg: string | null;
    thanks_video_url: string | null;
    url: string; 
  },
  id: string; // 12345678',
  type: 'campaign';
}

export interface PatreonUserObject {
  attributes: {
    about: string | null;
    age_verification_status: string | null;
    apple_id: string | null;
    can_see_nsfw: boolean;
    created: string;
    current_user_block_status: string;
    default_country_code: string | null;
    discord_id: string | null;
    email: string; 
    facebook: string | null;
    facebook_id: string | null;
    first_name: string | null;
    full_name: string | null; 
    gender: number; 
    google_id: string | null; 
    has_password: boolean; 
    image_url: string | null;
    is_deleted: boolean; 
    is_email_verified: boolean; 
    is_nuked: boolean; 
    is_suspended: boolean; 
    last_name: string | null; 
    patron_currency: string;
    social_connections: {
      discord: PatreonSocialConnection | null;
      facebook: PatreonSocialConnection | null;
      google: PatreonSocialConnection | null;
      instagram: PatreonSocialConnection | null,
      reddit: PatreonSocialConnection | null;
      spotify: PatreonSocialConnection | null;
      spotify_open_access: PatreonSocialConnection | null;
      tiktok: PatreonSocialConnection | null;
      twitch: PatreonSocialConnection | null;
      twitter: PatreonSocialConnection | null;
      twitter2: PatreonSocialConnection | null;
      vimeo: PatreonSocialConnection | null;
      youtube: PatreonSocialConnection | null;
    },
    thumb_url: string;
    twitch: string | null;
    twitter: string | null;
    url: string; // 'https://www.patreon.com/ZipCaptions',
    vanity: string; // 'ZipCaptions',
    youtube: null
  },
  id: string; // '100930067',
  type: 'user';
}

interface PatreonSocialConnection {
  scopes: string[];
  url: string;
  user_id: string;
}