import { existsSync, mkdirpSync, readFileSync, writeFileSync } from "fs-extra";
import { normalize, join } from "path";
import { InstanceConfig } from "../namespaces/instanceConfig";
import { nanoid } from "nanoid";
import { stringify as yamlStringify, parse as yamlParse } from "yaml";
import { get as _get } from "lodash";

export default class AbstractInstance {
  static configName = "mccli.yaml";

  protected instancePath: string = "";

  setInstancePath(instancePath: string): string {
    if (instancePath === "." || instancePath === "") {
      instancePath = process.cwd();
    } else {
      instancePath = normalize(instancePath);
    }

    if (!existsSync(instancePath)) {
      mkdirpSync(instancePath);
    }

    this.instancePath = instancePath;

    return this.instancePath;
  }

  getInstancePath(): string {
    return this.instancePath;
  }

  protected downloadThreads: number = 4;

  setDownloadThreads(downloadThreads: number): number {
    this.downloadThreads = downloadThreads;

    return this.downloadThreads;
  }

  getDownloadThreads(): number {
    return this.downloadThreads;
  }

  protected instanceConfig: InstanceConfig.Root;

  constructor(instancePath: string) {
    this.setInstancePath(instancePath);
    this.instanceConfig = this.readInstanceConfig();
  }

  private readInstanceConfig(): InstanceConfig.Root {
    const path = join(this.instancePath, AbstractInstance.configName);

    if (!existsSync(path)) this.createInstanceConfig();

    const content = readFileSync(path, "utf8");
    return yamlParse(content);
  }

  private createInstanceConfig() {
    const path = join(this.instancePath, AbstractInstance.configName);
    const data: InstanceConfig.Root = {
      versionId: "",
      uuid: nanoid(),
      metadata: {},
    };
    const content = yamlStringify(data);
    writeFileSync(path, content, "utf8");
  }

  protected getInstanceConfig(): InstanceConfig.Root {
    return this.instanceConfig;
  }

  protected getInstanceConfigMetadata(
    path: string,
    defaultValue: any = null
  ): any {
    return _get(this.instanceConfig, path, defaultValue);
  }
}
