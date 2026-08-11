import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const shellLauncher = readFileSync(new URL("../start.sh", import.meta.url), "utf8");
const windowsLauncher = readFileSync(new URL("../start.cmd", import.meta.url), "utf8");

describe("lanzadores Docker", () => {
  it("diagnostica cliente, Compose y motor en macOS y Linux", () => {
    expect(shellLauncher).toContain("command -v docker");
    expect(shellLauncher).toContain("docker compose version");
    expect(shellLauncher).toContain("docker info");
    expect(shellLauncher).toContain("mac-install");
    expect(shellLauncher).toContain("engine/install");
    expect(shellLauncher).toContain("[ES] Docker no está instalado.");
    expect(shellLauncher).toContain("[EN] Docker is not installed.");
    expect(shellLauncher).toContain("[EN] DardOps is available at");
  });

  it("ofrece diagnóstico e instalación para Windows", () => {
    expect(windowsLauncher).toContain("where docker");
    expect(windowsLauncher).toContain("Docker.DockerDesktop");
    expect(windowsLauncher).toContain("wsl --install");
    expect(windowsLauncher).toContain("docker compose up --build -d");
    expect(windowsLauncher).toContain("[ES] Docker no está instalado");
    expect(windowsLauncher).toContain("[EN] Docker is not installed");
    expect(windowsLauncher).toContain("[EN] DardOps is available at");
  });
});
