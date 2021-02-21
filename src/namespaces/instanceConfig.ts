import { MinecraftVersion } from "./minecraftVersion";

export namespace InstanceConfig {
  export interface Metadata {
    [key: string]: any;
  }

  export interface Root {
    uuid: string;
    versionId: string;
    metadata: Metadata;
  }
}
