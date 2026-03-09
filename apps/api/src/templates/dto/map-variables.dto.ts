import { IsObject, IsNotEmpty } from 'class-validator';

export class MapVariablesDto {
    /**
     * Key: placeholder string (e.g. "client_name")
     * Value: system field path (e.g. "client.name")
     */
    @IsObject()
    @IsNotEmpty()
    mappings: Record<string, string>;
}
