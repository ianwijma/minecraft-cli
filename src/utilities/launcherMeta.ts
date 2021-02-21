import axios, { AxiosInstance } from "axios";
import { MinecraftVersion } from "../namespaces/minecraftVersion";

export default class LauncherMeta {
  private static schema: string = "https";

  private static hostname: string = "launchermeta.mojang.com";

  private static versionUri: string = "mc/game/version_manifest.json";

  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${LauncherMeta.schema}://${LauncherMeta.hostname}`,
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "User-Agent": "Minecraft-cli",
      },
    });
  }

  async getVersions(): Promise<MinecraftVersion.Root> {
    const { data } = await this.client.get(LauncherMeta.versionUri);
    return data;
  }
}
