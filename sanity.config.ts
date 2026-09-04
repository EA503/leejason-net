'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig, type DocumentActionComponent } from 'sanity'
import { structureTool, type StructureResolver } from 'sanity/structure'

import { apiVersion, dataset, projectId } from '@/sanity/env'
import { schemaTypes, SINGLETON_TYPES } from '@/sanity/schemas'

const singletons = new Set<string>(SINGLETON_TYPES)

/**
 * Singletons get a direct edit form; collections get a list. Anything not named
 * here is hidden, so the sidebar shows exactly what Jason is meant to touch.
 */
const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Hero & Bio')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('CBA Lifestyle description')
        .id('cba')
        .child(S.document().schemaType('cba').documentId('cba')),
      S.listItem()
        .title('Contact info')
        .id('contact')
        .child(S.document().schemaType('contact').documentId('contact')),
      S.listItem()
        .title('Links')
        .id('socialLinks')
        .child(S.document().schemaType('socialLinks').documentId('socialLinks')),
      S.divider(),
      S.documentTypeListItem('episode').title('Podcast episodes'),
      S.documentTypeListItem('moment').title('Moments photos'),
      S.divider(),
      S.documentTypeListItem('guestApplication').title('Guest applications'),
    ])

export default defineConfig({
  name: 'default',
  title: 'Jason Lee',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons already exist; keep them out of the global "create new" menu.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    actions: (input, { schemaType }) => {
      if (singletons.has(schemaType)) {
        const blocked = new Set(['unpublish', 'delete', 'duplicate'])
        return input.filter(
          (action: DocumentActionComponent) => !blocked.has(action.action ?? ''),
        )
      }
      return input
    },
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
