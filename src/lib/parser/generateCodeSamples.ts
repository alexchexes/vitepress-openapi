import type { OAExampleObject, ParsedOpenAPI, ParsedOperation, PlaygroundSecurityScheme } from '../../types'
import { availableLanguages, useTheme } from '../../composables/useTheme'
import { httpVerbs } from '../../index'
import { buildRequest } from '../codeSamples/buildRequest'
import { generateCodeSample } from '../codeSamples/generateCodeSample'
import { resolveBaseUrl } from '../resolveBaseUrl'

export async function generateCodeSamples(spec: ParsedOpenAPI): Promise<ParsedOpenAPI> {
  if (!spec?.paths) {
    return spec
  }

  const baseUrl = resolveBaseUrl(spec.servers?.[0]?.url || '')

  for (const [path, pathObject] of Object.entries(spec.paths)) {
    for (const verb of httpVerbs) {
      const operation = (pathObject as Record<string, any>)[verb] as ParsedOperation

      if (!operation) {
        continue
      }

      const authorizations = operation.securityUi?.[0]?.schemes || []

      const requestBodyContentTypes = Object.keys(operation.requestBody?.content || {})
      const requestBodyExamples: OAExampleObject[] = requestBodyContentTypes
        .map((contentType) => {
          return Object.values(operation.requestBody?.content?.[contentType]?.examples || {})
        })
        .flat()

      const autogeneratedRequestBodyExample = requestBodyExamples
        .find(example => example?.isAutogenerated)

      const request = buildRequest({
        path,
        method: verb,
        baseUrl,
        parameters: operation.parameters || [],
        authorizations: Object.entries(authorizations).map(([name, value]: [string, any]) => {
          return {
            ...value,
            name: String(name),
            label: String(name),
          } as PlaygroundSecurityScheme
        }),
        body: autogeneratedRequestBodyExample?.value || undefined,
        headers: {
          ...(useTheme().getCodeSamplesDefaultHeaders() || {}),
        },
        variables: {},
        contentType: requestBodyContentTypes.length > 0 ? requestBodyContentTypes[0] : undefined,
      })

      operation.codeSamples = await Promise.all(
        availableLanguages.map(async (language) => {
          return {
            ...language,
            source: await generateCodeSample(language.lang, request),
          }
        }),
      )
    }
  }

  return spec
}
