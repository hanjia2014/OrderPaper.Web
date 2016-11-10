﻿export class AppSettings {
    public static sp_host: string;
    public static get API_ENDPOINT(): string { return '/api/orderpaper'; }
    public static get API_SECTION_ENDPOINT(): string { return '/api/section'; }
    public static get API_CONFIGURATION_ENDPOINT(): string { return '/api/configuration'; }
    public static get IMAGE_PATH(): string { return '/content/images/icons/'; }
    public static get SP_HOST(): string { return this.sp_host; }
    public static set SP_HOST(value: string) { this.sp_host = value; }
}