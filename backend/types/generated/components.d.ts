import type { Schema, Attribute } from '@strapi/strapi';

export interface ProductSectionProductDescription extends Schema.Component {
  collectionName: 'components_product_section_product_descriptions';
  info: {
    displayName: 'ProductDescription';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Blocks;
  };
}

export interface ProductSectionShippingOptions extends Schema.Component {
  collectionName: 'components_product_section_shipping_options';
  info: {
    displayName: 'ShippingOptions';
  };
  attributes: {
    name: Attribute.String;
    rate: Attribute.Decimal;
    description: Attribute.Text;
    is_available: Attribute.Boolean & Attribute.DefaultTo<true>;
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
      'product-section.product-description': ProductSectionProductDescription;
      'product-section.shipping-options': ProductSectionShippingOptions;
      'product-section.tax-options': ProductSectionTaxOptions;
    }
  }
}
