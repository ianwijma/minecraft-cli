export declare module MinecraftPackage {
  export interface Arguments {
    game: any[];
    jvm: any[];
  }

  export interface AssetIndex {
    id: string;
    sha1: string;
    size: number;
    totalSize: number;
    url: string;
  }

  export interface Client {
    sha1: string;
    size: number;
    url: string;
  }

  export interface ClientMappings {
    sha1: string;
    size: number;
    url: string;
  }

  export interface Server {
    sha1: string;
    size: number;
    url: string;
  }

  export interface ServerMappings {
    sha1: string;
    size: number;
    url: string;
  }

  export interface Downloads {
    client: Client;
    client_mappings: ClientMappings;
    server: Server;
    server_mappings: ServerMappings;
  }

  export interface Artifact {
    path: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface Javadoc {
    path: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface NativesLinux {
    path: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface NativesMacos {
    path: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface NativesWindows {
    path: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface Sources {
    path: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface NativesOsx {
    path: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface Classifiers {
    javadoc: Javadoc;
    "natives-linux": NativesLinux;
    "natives-macos": NativesMacos;
    "natives-windows": NativesWindows;
    sources: Sources;
    "natives-osx": NativesOsx;
  }

  export interface LibraryDownloads {
    artifact: Artifact;
    classifiers: Classifiers;
  }

  export interface Os {
    name: string;
  }

  export interface Rule {
    action: string;
    os: Os;
  }

  export interface Natives {
    osx: string;
    linux: string;
    windows: string;
  }

  export interface Extract {
    exclude: string[];
  }

  export interface Library {
    downloads: LibraryDownloads;
    name: string;
    rules: Rule[];
    natives: Natives;
    extract: Extract;
  }

  export interface File {
    id: string;
    sha1: string;
    size: number;
    url: string;
  }

  export interface Client2 {
    argument: string;
    file: File;
    type: string;
  }

  export interface Logging {
    client: Client2;
  }

  export interface Root {
    arguments: Arguments;
    assetIndex: AssetIndex;
    assets: string;
    complianceLevel: number;
    downloads: Downloads;
    id: string;
    libraries: Library[];
    logging: Logging;
    mainClass: string;
    minimumLauncherVersion: number;
    releaseTime: Date;
    time: Date;
    type: string;
  }
}
