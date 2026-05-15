import { getData } from "../services/dataLoader"

import {
    extrairModeloCPU,
    extrairSocketCPU,
    extrairTDPCPU,

    extrairModeloGPU,
    extrairVRAM,
    extrairGddr,
    extrairTDPGPU,

    extrairCapacidadeRAM,
    extrairModulosRAM,
    extrairVelocidadeRAM,
    extrairDDRRAM,
    extrairCL,

    extrairSocketMB,
    extrairChipsetMB,
    extrairFormatoMB,
    extrairDDRMB,

    extrairCapacidadeStorage,
    extrairTipoStorage,
    extrairInterfaceStorage,
    extrairFormatoStorage,
    extrairVelocidadeLeitura,
    extrairVelocidadeGravacao,

    extrairPotenciaFonte,
    extrairCertificacaoFonte,
    extrairModularidadeFonte,
    extrairPCIeConectores,
    extrairSATAConectores,
    extrairEPSConectores,

    extrairQtdFans,
    extrairFormatoGabinete,

} from "./componenteUtils"

import { encontrarProdutoBase } from "./specMatcher"

export function extrairSpecs(
    texto: string,
    tipo: string
): Record<string, any> {

    switch (tipo) {

        // ======================================================
        // CPU
        // ======================================================

        case "cpu": {

            const cpus =
                getData("cpu")

            const cpuBase =
                encontrarProdutoBase(
                    texto,
                    cpus,
                    "name"
                )

            return {

                modelo:
                    extrairModeloCPU(texto),

                socket:
                    cpuBase?.socket ??
                    extrairSocketCPU(texto),

                tdp:
                    cpuBase?.tdp ??
                    extrairTDPCPU(texto),

                velocidade:
                    cpuBase?.core_clock ?? 0,

                boost:
                    cpuBase?.boost_clock ?? 0,

                nucleos:
                    cpuBase?.core_count ?? 0,

                threads:
                    cpuBase?.thread_count ?? 0,

                videoIntegrado:
                    !!cpuBase?.graphics
            }
        }

        // ======================================================
        // GPU
        // ======================================================

        case "gpu": {

            const gpus =
                getData("gpu")

            const gpuBase =
                encontrarProdutoBase(
                    texto,
                    gpus,
                    "name"
                )

            return {

                modelo:
                    extrairModeloGPU(texto),

                vram:
                    gpuBase?.memory ??
                    extrairVRAM(texto),

                gddr:
                    gpuBase?.memory_type
                        ?.replace("GDDR", "")
                        ? Number(
                            gpuBase.memory_type
                                .replace("GDDR", "")
                        )
                        : extrairGddr(texto),

                tdp:
                    gpuBase?.tdp ??
                    extrairTDPGPU(texto),

                chipset:
                    gpuBase?.chipset ?? ""
            }
        }

        // ======================================================
        // RAM
        // ======================================================

        case "ram": {

            const rams =
                getData("ram")

            const ramBase =
                encontrarProdutoBase(
                    texto,
                    rams,
                    "name"
                )

            return {

                capacidade:
                    ramBase?.modules
                        ? ramBase.modules.reduce(
                            (
                                total: number,
                                atual: number
                            ) => total + atual,
                            0
                        )
                        : extrairCapacidadeRAM(texto),

                modulos:
                    ramBase?.modules ??
                    extrairModulosRAM(texto),

                velocidade:
                    ramBase?.speed?.[0] ??
                    extrairVelocidadeRAM(texto),

                ddr:
                    extrairDDRRAM(texto),

                cl:
                    ramBase?.cas_latency ??
                    extrairCL(texto)
            }
        }

        // ======================================================
        // PLACA MÃE
        // ======================================================

        case "placamae": {

            const motherboards =
                getData("placamae")

            const mbBase =
                encontrarProdutoBase(
                    texto,
                    motherboards,
                    "name"
                )

            return {

                socket:
                    mbBase?.socket ??
                    extrairSocketMB(texto),

                chipset:
                    extrairChipsetMB(texto),

                formato:
                    mbBase?.form_factor
                        ? extrairFormatoMB(
                            mbBase.form_factor
                        )
                        : extrairFormatoMB(texto),

                ddr:
                    extrairDDRMB(texto),

                maxRam:
                    mbBase?.max_memory ?? 0
            }
        }

        // ======================================================
        // STORAGE
        // ======================================================

        case "armazenamento": {

            const storages =
                getData("armazenamento")

            const storageBase =
                encontrarProdutoBase(
                    texto,
                    storages,
                    "name"
                )

            return {

                capacidade:
                    storageBase?.capacity ??
                    extrairCapacidadeStorage(texto),

                tipoArmazenamento:
                    extrairTipoStorage(texto),

                interface:
                    extrairInterfaceStorage(texto),

                formato:
                    extrairFormatoStorage(texto),

                velocidadeLeitura:
                    extrairVelocidadeLeitura(texto),

                velocidadeGravacao:
                    extrairVelocidadeGravacao(texto)
            }
        }

        // ======================================================
        // FONTE
        // ======================================================

        case "fonte": {

            return {

                potencia:
                    extrairPotenciaFonte(texto),

                certificacao:
                    extrairCertificacaoFonte(texto),

                modularidade:
                    extrairModularidadeFonte(texto),

                conectoresPCIe:
                    extrairPCIeConectores(texto),

                conectoresSATA:
                    extrairSATAConectores(texto),

                conectoresEPS:
                    extrairEPSConectores(texto)
            }
        }

        // ======================================================
        // GABINETE
        // ======================================================

        case "gabinete": {

            return {

                fans:
                    extrairQtdFans(texto),

                formato:
                    extrairFormatoGabinete(texto)
            }
        }

        // ======================================================
        // DEFAULT
        // ======================================================

        default:
            return {}
    }
}