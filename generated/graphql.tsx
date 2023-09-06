import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CharCollection = {
  char_detail: Common;
  id: Scalars['Float'];
};

export type Characters = CharCollection & {
  __typename?: 'Characters';
  char_detail: Common;
  id: Scalars['Float'];
  variant?: Maybe<Scalars['String']>;
};

export type Common = {
  __typename?: 'Common';
  character: Scalars['String'];
  meaning: Scalars['String'];
  pinyin: Scalars['String'];
};

export type DatabaseError = ErrorResponse & {
  __typename?: 'DatabaseError';
  message: Scalars['String'];
  type: Scalars['String'];
};

export type EmailConstraint = {
  __typename?: 'EmailConstraint';
  isEmail?: Maybe<Scalars['String']>;
  isNotEmpty?: Maybe<Scalars['String']>;
};

export type EmailInput = {
  email: Scalars['String'];
};

export type EmailValidation = {
  __typename?: 'EmailValidation';
  constraints: EmailConstraint;
  property: Scalars['String'];
};

export type ErrorResponse = {
  message: Scalars['String'];
};

export type FlashcardSentences = {
  __typename?: 'FlashcardSentences';
  passed?: Maybe<Scalars['Boolean']>;
  sentences?: Maybe<Sentences>;
};

export type FlashcardWords = {
  __typename?: 'FlashcardWords';
  passed?: Maybe<Scalars['Boolean']>;
  words?: Maybe<Words>;
};

export type Flashcards = {
  __typename?: 'Flashcards';
  characters?: Maybe<Characters>;
  passed?: Maybe<Scalars['Boolean']>;
};

export type LoginInputs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavourite: Scalars['Boolean'];
  changePass: RegResponse;
  delFavourite: Scalars['Boolean'];
  forgotPass: Scalars['Boolean'];
  login: RegResponse;
  logout: Scalars['Boolean'];
  register: RegResponse;
};


export type MutationAddFavouriteArgs = {
  id: Scalars['Float'];
  options: Scalars['String'];
};


export type MutationChangePassArgs = {
  password: PasswordInput;
  token: Scalars['String'];
};


export type MutationDelFavouriteArgs = {
  id: Scalars['Float'];
  options: Scalars['String'];
};


export type MutationForgotPassArgs = {
  emailInput: EmailInput;
};


export type MutationLoginArgs = {
  logInputs: LoginInputs;
};


export type MutationRegisterArgs = {
  regInputs: RegInputs;
};

export type Options = {
  characters: Scalars['Boolean'];
  sentences: Scalars['Boolean'];
  words: Scalars['Boolean'];
};

export type PaginatedCharResponse = {
  __typename?: 'PaginatedCharResponse';
  charResponse: Array<CharResponse>;
  hasMoreChar?: Maybe<Scalars['Boolean']>;
  hasMoreSentence?: Maybe<Scalars['Boolean']>;
  hasMoreWord?: Maybe<Scalars['Boolean']>;
};

export type PasswordConstraint = {
  __typename?: 'PasswordConstraint';
  isLength?: Maybe<Scalars['String']>;
  isNotEmpty?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type PasswordValidation = {
  __typename?: 'PasswordValidation';
  constraints: PasswordConstraint;
  property: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findChar: PaginatedCharResponse;
  isLogged?: Maybe<Users>;
};


export type QueryFindCharArgs = {
  char: Array<Scalars['String']>;
  cursorChar?: InputMaybe<Scalars['Int']>;
  cursorSent?: InputMaybe<Scalars['Int']>;
  cursorWord?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  options: Options;
};

export type RegInputs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Sentences = CharCollection & {
  __typename?: 'Sentences';
  char_detail: Common;
  chengyu: Scalars['Boolean'];
  id: Scalars['Float'];
};

export type UserConstraint = {
  __typename?: 'UserConstraint';
  isNotEmpty?: Maybe<Scalars['String']>;
  maxLength?: Maybe<Scalars['String']>;
};

export type UserValidation = {
  __typename?: 'UserValidation';
  constraints: UserConstraint;
  property: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  favChars: Array<Characters>;
  favSentences: Array<Characters>;
  favWords: Array<Words>;
  flashcard: Array<FlashResponse>;
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type ValidationErrors = ErrorResponse & {
  __typename?: 'ValidationErrors';
  message: Scalars['String'];
  responses: Array<ValidationResponse>;
};

export type ValidationResponse = EmailValidation | PasswordValidation | UserValidation;

export type Words = CharCollection & {
  __typename?: 'Words';
  char_detail: Common;
  id: Scalars['Float'];
  variant?: Maybe<Scalars['String']>;
};

export type CharResponse = Characters | Sentences | Words;

export type FlashResponse = FlashcardSentences | FlashcardWords | Flashcards;

export type RegResponse = DatabaseError | Users | ValidationErrors;

type ErrorResponse_DatabaseError_Fragment = { __typename?: 'DatabaseError', message: string };

type ErrorResponse_ValidationErrors_Fragment = { __typename?: 'ValidationErrors', message: string };

export type ErrorResponseFragment = ErrorResponse_DatabaseError_Fragment | ErrorResponse_ValidationErrors_Fragment;

export type DatabaseResponseFragment = { __typename?: 'DatabaseError', message: string };

export type ValidationResponseFragment = { __typename?: 'ValidationErrors', message: string, responses: Array<{ __typename?: 'EmailValidation', property: string, constraints: { __typename?: 'EmailConstraint', isNotEmpty?: string | null, isEmail?: string | null } } | { __typename?: 'PasswordValidation', property: string, constraints: { __typename?: 'PasswordConstraint', isNotEmpty?: string | null, isLength?: string | null, matches?: string | null } } | { __typename?: 'UserValidation', property: string, constraints: { __typename?: 'UserConstraint', isNotEmpty?: string | null, maxLength?: string | null } }> };

export type UserResponseFragment = { __typename?: 'Users', username: string, email: string, createdAt: any, flashcard: Array<{ __typename?: 'FlashcardSentences', passed?: boolean | null, sentences?: { __typename?: 'Sentences', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'FlashcardWords', passed?: boolean | null, words?: { __typename?: 'Words', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'Flashcards', passed?: boolean | null, characters?: { __typename?: 'Characters', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null }> };

export type AddFavouriteMutationVariables = Exact<{
  id: Scalars['Float'];
  option: Scalars['String'];
}>;


export type AddFavouriteMutation = { __typename?: 'Mutation', addFavourite: boolean };

export type ChangePassMutationVariables = Exact<{
  token: Scalars['String'];
  password: PasswordInput;
}>;


export type ChangePassMutation = { __typename?: 'Mutation', changePass: { __typename?: 'DatabaseError', message: string } | { __typename?: 'Users', username: string, email: string, createdAt: any, flashcard: Array<{ __typename?: 'FlashcardSentences', passed?: boolean | null, sentences?: { __typename?: 'Sentences', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'FlashcardWords', passed?: boolean | null, words?: { __typename?: 'Words', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'Flashcards', passed?: boolean | null, characters?: { __typename?: 'Characters', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null }> } | { __typename?: 'ValidationErrors', message: string, responses: Array<{ __typename?: 'EmailValidation', property: string, constraints: { __typename?: 'EmailConstraint', isNotEmpty?: string | null, isEmail?: string | null } } | { __typename?: 'PasswordValidation', property: string, constraints: { __typename?: 'PasswordConstraint', isNotEmpty?: string | null, isLength?: string | null, matches?: string | null } } | { __typename?: 'UserValidation', property: string, constraints: { __typename?: 'UserConstraint', isNotEmpty?: string | null, maxLength?: string | null } }> } };

export type DelFavouriteMutationVariables = Exact<{
  id: Scalars['Float'];
  option: Scalars['String'];
}>;


export type DelFavouriteMutation = { __typename?: 'Mutation', delFavourite: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  emailInput: EmailInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPass: boolean };

export type LoginMutationVariables = Exact<{
  logInputs: LoginInputs;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'DatabaseError', message: string } | { __typename?: 'Users', username: string, email: string, createdAt: any, flashcard: Array<{ __typename?: 'FlashcardSentences', passed?: boolean | null, sentences?: { __typename?: 'Sentences', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'FlashcardWords', passed?: boolean | null, words?: { __typename?: 'Words', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'Flashcards', passed?: boolean | null, characters?: { __typename?: 'Characters', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null }> } | { __typename?: 'ValidationErrors', message: string, responses: Array<{ __typename?: 'EmailValidation', property: string, constraints: { __typename?: 'EmailConstraint', isNotEmpty?: string | null, isEmail?: string | null } } | { __typename?: 'PasswordValidation', property: string, constraints: { __typename?: 'PasswordConstraint', isNotEmpty?: string | null, isLength?: string | null, matches?: string | null } } | { __typename?: 'UserValidation', property: string, constraints: { __typename?: 'UserConstraint', isNotEmpty?: string | null, maxLength?: string | null } }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  regInputs: RegInputs;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'DatabaseError', message: string } | { __typename?: 'Users', username: string, email: string, createdAt: any, flashcard: Array<{ __typename?: 'FlashcardSentences', passed?: boolean | null, sentences?: { __typename?: 'Sentences', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'FlashcardWords', passed?: boolean | null, words?: { __typename?: 'Words', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'Flashcards', passed?: boolean | null, characters?: { __typename?: 'Characters', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null }> } | { __typename?: 'ValidationErrors', message: string, responses: Array<{ __typename?: 'EmailValidation', property: string, constraints: { __typename?: 'EmailConstraint', isNotEmpty?: string | null, isEmail?: string | null } } | { __typename?: 'PasswordValidation', property: string, constraints: { __typename?: 'PasswordConstraint', isNotEmpty?: string | null, isLength?: string | null, matches?: string | null } } | { __typename?: 'UserValidation', property: string, constraints: { __typename?: 'UserConstraint', isNotEmpty?: string | null, maxLength?: string | null } }> } };

export type FindCharQueryVariables = Exact<{
  char: Array<Scalars['String']> | Scalars['String'];
  options: Options;
  limit: Scalars['Int'];
  cursorChar?: InputMaybe<Scalars['Int']>;
  cursorWord?: InputMaybe<Scalars['Int']>;
  cursorSent?: InputMaybe<Scalars['Int']>;
}>;


export type FindCharQuery = { __typename?: 'Query', findChar: { __typename?: 'PaginatedCharResponse', hasMoreChar?: boolean | null, hasMoreWord?: boolean | null, hasMoreSentence?: boolean | null, charResponse: Array<{ __typename?: 'Characters', id: number, variant?: string | null, char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | { __typename?: 'Sentences', id: number, chengyu: boolean, char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | { __typename?: 'Words', id: number, variant?: string | null, char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } }> } };

export type LoggedQueryVariables = Exact<{ [key: string]: never; }>;


export type LoggedQuery = { __typename?: 'Query', isLogged?: { __typename?: 'Users', username: string, email: string, createdAt: any, id: number, favChars: Array<{ __typename?: 'Characters', id: number, char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } }>, favWords: Array<{ __typename?: 'Words', id: number, char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } }>, favSentences: Array<{ __typename?: 'Characters', id: number, char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } }>, flashcard: Array<{ __typename?: 'FlashcardSentences', passed?: boolean | null, sentences?: { __typename?: 'Sentences', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'FlashcardWords', passed?: boolean | null, words?: { __typename?: 'Words', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null } | { __typename?: 'Flashcards', passed?: boolean | null, characters?: { __typename?: 'Characters', char_detail: { __typename?: 'Common', character: string, pinyin: string, meaning: string } } | null }> } | null };

export const ErrorResponseFragmentDoc = gql`
    fragment ErrorResponse on ErrorResponse {
  ... on ErrorResponse {
    message
  }
}
    `;
export const DatabaseResponseFragmentDoc = gql`
    fragment DatabaseResponse on DatabaseError {
  ... on DatabaseError {
    message
  }
}
    `;
export const ValidationResponseFragmentDoc = gql`
    fragment ValidationResponse on ValidationErrors {
  ... on ValidationErrors {
    message
    responses {
      ... on UserValidation {
        property
        constraints {
          isNotEmpty
          maxLength
        }
      }
      ... on PasswordValidation {
        property
        constraints {
          isNotEmpty
          isLength
          matches
        }
      }
      ... on EmailValidation {
        property
        constraints {
          isNotEmpty
          isEmail
        }
      }
    }
  }
}
    `;
export const UserResponseFragmentDoc = gql`
    fragment UserResponse on Users {
  ... on Users {
    username
    email
    createdAt
    flashcard {
      ... on Flashcards {
        passed
        characters {
          char_detail {
            character
            pinyin
            meaning
          }
        }
      }
      ... on FlashcardWords {
        passed
        words {
          char_detail {
            character
            pinyin
            meaning
          }
        }
      }
      ... on FlashcardSentences {
        passed
        sentences {
          char_detail {
            character
            pinyin
            meaning
          }
        }
      }
    }
  }
}
    `;
export const AddFavouriteDocument = gql`
    mutation addFavourite($id: Float!, $option: String!) {
  addFavourite(id: $id, options: $option)
}
    `;
export type AddFavouriteMutationFn = Apollo.MutationFunction<AddFavouriteMutation, AddFavouriteMutationVariables>;

/**
 * __useAddFavouriteMutation__
 *
 * To run a mutation, you first call `useAddFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFavouriteMutation, { data, loading, error }] = useAddFavouriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      option: // value for 'option'
 *   },
 * });
 */
export function useAddFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<AddFavouriteMutation, AddFavouriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFavouriteMutation, AddFavouriteMutationVariables>(AddFavouriteDocument, options);
      }
export type AddFavouriteMutationHookResult = ReturnType<typeof useAddFavouriteMutation>;
export type AddFavouriteMutationResult = Apollo.MutationResult<AddFavouriteMutation>;
export type AddFavouriteMutationOptions = Apollo.BaseMutationOptions<AddFavouriteMutation, AddFavouriteMutationVariables>;
export const ChangePassDocument = gql`
    mutation ChangePass($token: String!, $password: PasswordInput!) {
  changePass(token: $token, password: $password) {
    ...UserResponse
    ...ErrorResponse
    ...ValidationResponse
    ...DatabaseResponse
  }
}
    ${UserResponseFragmentDoc}
${ErrorResponseFragmentDoc}
${ValidationResponseFragmentDoc}
${DatabaseResponseFragmentDoc}`;
export type ChangePassMutationFn = Apollo.MutationFunction<ChangePassMutation, ChangePassMutationVariables>;

/**
 * __useChangePassMutation__
 *
 * To run a mutation, you first call `useChangePassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePassMutation, { data, loading, error }] = useChangePassMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useChangePassMutation(baseOptions?: Apollo.MutationHookOptions<ChangePassMutation, ChangePassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePassMutation, ChangePassMutationVariables>(ChangePassDocument, options);
      }
export type ChangePassMutationHookResult = ReturnType<typeof useChangePassMutation>;
export type ChangePassMutationResult = Apollo.MutationResult<ChangePassMutation>;
export type ChangePassMutationOptions = Apollo.BaseMutationOptions<ChangePassMutation, ChangePassMutationVariables>;
export const DelFavouriteDocument = gql`
    mutation delFavourite($id: Float!, $option: String!) {
  delFavourite(id: $id, options: $option)
}
    `;
export type DelFavouriteMutationFn = Apollo.MutationFunction<DelFavouriteMutation, DelFavouriteMutationVariables>;

/**
 * __useDelFavouriteMutation__
 *
 * To run a mutation, you first call `useDelFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDelFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [delFavouriteMutation, { data, loading, error }] = useDelFavouriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *      option: // value for 'option'
 *   },
 * });
 */
export function useDelFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<DelFavouriteMutation, DelFavouriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DelFavouriteMutation, DelFavouriteMutationVariables>(DelFavouriteDocument, options);
      }
export type DelFavouriteMutationHookResult = ReturnType<typeof useDelFavouriteMutation>;
export type DelFavouriteMutationResult = Apollo.MutationResult<DelFavouriteMutation>;
export type DelFavouriteMutationOptions = Apollo.BaseMutationOptions<DelFavouriteMutation, DelFavouriteMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($emailInput: EmailInput!) {
  forgotPass(emailInput: $emailInput)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      emailInput: // value for 'emailInput'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($logInputs: LoginInputs!) {
  login(logInputs: $logInputs) {
    ...UserResponse
    ...ErrorResponse
    ...ValidationResponse
    ...DatabaseResponse
  }
}
    ${UserResponseFragmentDoc}
${ErrorResponseFragmentDoc}
${ValidationResponseFragmentDoc}
${DatabaseResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      logInputs: // value for 'logInputs'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($regInputs: RegInputs!) {
  register(regInputs: $regInputs) {
    ...UserResponse
    ...ErrorResponse
    ...ValidationResponse
    ...DatabaseResponse
  }
}
    ${UserResponseFragmentDoc}
${ErrorResponseFragmentDoc}
${ValidationResponseFragmentDoc}
${DatabaseResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      regInputs: // value for 'regInputs'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FindCharDocument = gql`
    query findChar($char: [String!]!, $options: Options!, $limit: Int!, $cursorChar: Int, $cursorWord: Int, $cursorSent: Int) {
  findChar(
    char: $char
    options: $options
    limit: $limit
    cursorChar: $cursorChar
    cursorWord: $cursorWord
    cursorSent: $cursorSent
  ) {
    hasMoreChar
    hasMoreWord
    hasMoreSentence
    charResponse {
      ... on CharCollection {
        char_detail {
          character
          pinyin
          meaning
        }
      }
      ... on Sentences {
        id
        chengyu
      }
      ... on Characters {
        id
        variant
      }
      ... on Words {
        id
        variant
      }
    }
  }
}
    `;

/**
 * __useFindCharQuery__
 *
 * To run a query within a React component, call `useFindCharQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCharQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCharQuery({
 *   variables: {
 *      char: // value for 'char'
 *      options: // value for 'options'
 *      limit: // value for 'limit'
 *      cursorChar: // value for 'cursorChar'
 *      cursorWord: // value for 'cursorWord'
 *      cursorSent: // value for 'cursorSent'
 *   },
 * });
 */
export function useFindCharQuery(baseOptions: Apollo.QueryHookOptions<FindCharQuery, FindCharQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCharQuery, FindCharQueryVariables>(FindCharDocument, options);
      }
export function useFindCharLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCharQuery, FindCharQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCharQuery, FindCharQueryVariables>(FindCharDocument, options);
        }
export type FindCharQueryHookResult = ReturnType<typeof useFindCharQuery>;
export type FindCharLazyQueryHookResult = ReturnType<typeof useFindCharLazyQuery>;
export type FindCharQueryResult = Apollo.QueryResult<FindCharQuery, FindCharQueryVariables>;
export const LoggedDocument = gql`
    query Logged {
  isLogged {
    username
    email
    createdAt
    id
    favChars {
      id
      char_detail {
        character
        pinyin
        meaning
      }
    }
    favWords {
      id
      char_detail {
        character
        pinyin
        meaning
      }
    }
    favSentences {
      id
      char_detail {
        character
        pinyin
        meaning
      }
    }
    flashcard {
      ... on Flashcards {
        passed
        characters {
          char_detail {
            character
            pinyin
            meaning
          }
        }
      }
      ... on FlashcardWords {
        passed
        words {
          char_detail {
            character
            pinyin
            meaning
          }
        }
      }
      ... on FlashcardSentences {
        passed
        sentences {
          char_detail {
            character
            pinyin
            meaning
          }
        }
      }
    }
  }
}
    `;

/**
 * __useLoggedQuery__
 *
 * To run a query within a React component, call `useLoggedQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoggedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoggedQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoggedQuery(baseOptions?: Apollo.QueryHookOptions<LoggedQuery, LoggedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoggedQuery, LoggedQueryVariables>(LoggedDocument, options);
      }
export function useLoggedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoggedQuery, LoggedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoggedQuery, LoggedQueryVariables>(LoggedDocument, options);
        }
export type LoggedQueryHookResult = ReturnType<typeof useLoggedQuery>;
export type LoggedLazyQueryHookResult = ReturnType<typeof useLoggedLazyQuery>;
export type LoggedQueryResult = Apollo.QueryResult<LoggedQuery, LoggedQueryVariables>;