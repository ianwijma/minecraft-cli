import AbstractServerInstance from "./abstractServerInstance";
import { prompt } from "inquirer";
import axios from "axios";
import { MinecraftVersion } from "../namespaces/minecraftVersion";
import { version } from "@oclif/command/lib/flags";
import { MinecraftPackage } from "../namespaces/minecraftPackage";
import LauncherMeta from "../utilities/launcherMeta";

export default class VanillaServerInstance extends AbstractServerInstance {
  private showSnapshots: boolean = false;

  enableSnapshots() {
    this.showSnapshots = true;
  }
  private showOldReleases: boolean = false;

  enableOldReleases() {
    this.showOldReleases = true;
  }

  private launcherMeta: LauncherMeta;

  private version: MinecraftVersion.Version;

  constructor(instancePath: string) {
    super(instancePath);

    this.launcherMeta = new LauncherMeta();
    this.version = this.getInstanceConfigMetadata("version", "");
  }

  async new(query: string): Promise<void> {
    this.version = await this.getVersion(query);
    await this.installVersion();
  }

  private async installVersion(): Promise<void> {
    const { downloads } = await this.getManifest();
    const { server } = downloads;
    if (!server) {
      const { id } = this.version;
      throw new Error(`Version ${id} does not has any server files`);
    }

    console.log(server);
  }

  private async getManifest(): Promise<MinecraftPackage.Root> {
    const { url } = this.version;
    const { data } = await axios(url);
    return data;
  }

  private async getVersion(query: string) {
    let version: MinecraftVersion.Version;

    if (query === "release" || query === "") {
      version = await this.getReleaseVersion();
    } else if (query === "snapshot") {
      version = await this.getSnapshotVersion();
    } else {
      const matchVersions: MinecraftVersion.Version[] = await this.searchVersion(
        query
      );
      if (matchVersions.length === 1) {
        version = matchVersions[0];
      } else if (matchVersions.length > 1) {
        version = await this.chooseVersion(
          "Found multiple matching versions:",
          matchVersions
        );
      } else {
        const versions = await this.getAllVersions();
        version = await this.chooseVersion(
          `No matching versions found with query ${query}, choose one manually`,
          Object.values(versions)
        );
      }
    }

    return version;
  }

  private async getReleaseVersion(): Promise<MinecraftVersion.Version> {
    const { latest } = await this.launcherMeta.getVersions();
    const { release } = latest;
    const versions = await this.getAllVersions();
    return this.mapVersions(versions)[release];
  }

  private async getSnapshotVersion(): Promise<MinecraftVersion.Version> {
    const { latest } = await this.launcherMeta.getVersions();
    const { snapshot } = latest;
    const versions = await this.getAllVersions();
    return this.mapVersions(versions)[snapshot];
  }

  private async searchVersion(
    query: string
  ): Promise<MinecraftVersion.Version[]> {
    query = query.toLowerCase();

    const versionArray: MinecraftVersion.Version[] = await this.getFilteredVersions();

    const matched: MinecraftVersion.Version[] = [];
    versionArray.forEach((version: MinecraftVersion.Version) => {
      const { id } = version;
      if (this.matchVersion(query, id, true)) matched.push(version);
    });

    if (matched.length === 0) {
      versionArray.forEach((version: MinecraftVersion.Version) => {
        const { id } = version;
        if (this.matchVersion(query, id, false)) matched.push(version);
      });
    }

    return matched;
  }

  private versionCache: MinecraftVersion.Version[] | undefined;

  private async getAllVersions(): Promise<MinecraftVersion.Version[]> {
    if (!this.versionCache) {
      const { versions } = await this.launcherMeta.getVersions();
      this.versionCache = versions;
    }

    return this.versionCache ? this.versionCache : [];
  }

  private async getFilteredVersions(): Promise<MinecraftVersion.Version[]> {
    const versions = await this.getAllVersions();
    return versions.filter((version) => {
      const { type } = version;
      return this.matchType(type);
    });
  }

  private mapVersions(
    versions: MinecraftVersion.Version[]
  ): { [key: string]: MinecraftVersion.Version } {
    const map: { [key: string]: MinecraftVersion.Version } = {};

    versions.forEach((version) => {
      const { id } = version;
      map[id] = version;
    });

    return map;
  }

  private async chooseVersion(
    reason: string,
    versions: MinecraftVersion.Version[]
  ): Promise<MinecraftVersion.Version> {
    const { version } = await prompt([
      {
        type: "list",
        name: "version",
        message: reason,
        choices: versions.map((version: MinecraftVersion.Version) => {
          return {
            name: `[${version.type}] ${version.id}`,
            value: version,
          };
        }),
      },
    ]);

    return version;
  }

  private matchVersion(
    query: string,
    current: string,
    exact: boolean = true
  ): boolean {
    current = current.toLowerCase();
    return exact ? current === query : current.indexOf(query) >= 0;
  }

  private matchType(type: MinecraftVersion.VersionType): boolean {
    const types = this.getEnabledTypes();
    return types.indexOf(type) >= 0;
  }

  private getEnabledTypes() {
    const types = [MinecraftVersion.VersionType.release];
    if (this.showSnapshots) types.push(MinecraftVersion.VersionType.snapshot);
    if (this.showOldReleases) {
      types.push(MinecraftVersion.VersionType.beta);
      types.push(MinecraftVersion.VersionType.alpha);
    }
    return types;
  }
}
