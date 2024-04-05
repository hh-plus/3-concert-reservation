/**
 * @packageDocumentation
 * @module api.functional.user.token
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, Primitive } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";

import type { GetTokenResDto } from "../../../../user/dto/getToken.dto";

/**
 * @controller UserController.getToken
 * @path GET /user/:userId/token
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function getToken(
  connection: IConnection,
  userId: number,
): Promise<getToken.Output> {
  return PlainFetcher.fetch(connection, {
    ...getToken.METADATA,
    path: getToken.path(userId),
  });
}
export namespace getToken {
  export type Output = Primitive<GetTokenResDto>;

  export const METADATA = {
    method: "GET",
    path: "/user/:userId/token",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: null,
  } as const;

  export const path = (userId: number) =>
    `/user/${encodeURIComponent(userId ?? "null")}/token`;
}
