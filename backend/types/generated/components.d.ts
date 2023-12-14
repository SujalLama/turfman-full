import type { Schema, Attribute } from '@strapi/strapi';

export interface GeneralCustomers extends Schema.Component {
  collectionName: 'components_general_customers';
  info: {
    displayName: 'Customers';
    description: '';
  };
  attributes: {
    email: Attribute.Email & Attribute.Unique;
  };
}

export interface GeneralEvent extends Schema.Component {
  collectionName: 'components_general_events';
  info: {
    displayName: 'Event';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    date: Attribute.Date;
    description: Attribute.Text;
  };
}

export interface GeneralSeo extends Schema.Component {
  collectionName: 'components_general_seos';
  info: {
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
  };
}

export interface ProductSectionProductDescription extends Schema.Component {
  collectionName: 'components_product_section_product_descriptions';
  info: {
    displayName: 'ProductDescription';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface ProductSectionShippingDistance extends Schema.Component {
  collectionName: 'components_product_section_shipping_distances';
  info: {
    displayName: 'Shipping Distance';
    description: '';
  };
  attributes: {
    from: Attribute.Float & Attribute.Required;
    rate: Attribute.Float & Attribute.Required;
    to: Attribute.Float & Attribute.Required;
  };
}

export interface ProductSectionShippingRate extends Schema.Component {
  collectionName: 'components_product_section_shipping_rates';
  info: {
    displayName: 'Shipping Rate';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['flat', 'distance']> &
      Attribute.Required &
      Attribute.DefaultTo<'flat'>;
    onlyLocally: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    localRate: Attribute.Float;
    outsideRate: Attribute.Float;
  };
}

export interface ProductSectionTaxOptions extends Schema.Component {
  collectionName: 'components_product_section_tax_options';
  info: {
    displayName: 'Tax Options';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    rate: Attribute.Decimal &
      Attribute.SetMinMax<{
        min: 0;
        max: 100;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.customers': GeneralCustomers;
      'general.event': GeneralEvent;
      'general.seo': GeneralSeo;
      'product-section.product-description': ProductSectionProductDescription;
      'product-section.shipping-distance': ProductSectionShippingDistance;
      'product-section.shipping-rate': ProductSectionShippingRate;
      'product-section.tax-options': ProductSectionTaxOptions;
    }
  }
}
