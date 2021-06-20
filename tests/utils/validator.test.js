import test from 'ava'

import {
  postValidator,
  putValidator
} from '../../utils/validator'

const postPayload = {
  acronym: 'WTFF',
  definition: 'What The Fucking Fuck'
}

const putPayload = {
  definition: 'What the Fuck Fucking'
}

test('POST should return error if acronym is null or empty', t => {
  const temp = { ...postPayload }
  temp.acronym = ''
  const { error } = postValidator(temp)
  t.is(error.message, '"acronym" contains an invalid value. "acronym" is not allowed to be empty')
})

test('POST should return error if definition is null or empty', t => {
  const temp = { ...postPayload }
  temp.definition = ''
  const { error } = postValidator(temp)
  t.is(error.message, '"definition" contains an invalid value. "definition" is not allowed to be empty')
})

test('POST should be okey with a good post payload', t => {
  const { error } = postValidator(postPayload)
  t.is(error, undefined)
})

test('PUT should return error if definition is null or empty', t => {
  const temp = { ...putValidator }
  temp.definition = ''
  const { error } = putValidator(temp)
  t.is(error.message, '"definition" contains an invalid value. "definition" is not allowed to be empty')
})

test('PUT should be okey with a good put payload', t => {
  const { error } = putValidator(putPayload)
  t.is(error, undefined)
})
