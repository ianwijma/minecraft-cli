export namespace MinecraftVersion {
  export enum VersionType {
    none = "none",
    release = "release",
    snapshot = "snapshot",
    beta = "old_beta",
    alpha = "old_alpha",
  }

  export interface Latest {
    release: string;
    snapshot: string;
  }

  export interface Version {
    id: string;
    type: VersionType;
    url: string;
    time: Date;
    releaseTime: Date;
  }

  export interface Root {
    latest: Latest;
    versions: Version[];
  }
}
