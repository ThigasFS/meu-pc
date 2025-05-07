import { Armazenamento, Fonte, Gabinete, PlacaMae, PlacaVideo, Processador,MemoriaRAM } from "./componente"

interface PC {
    placaMae: PlacaMae,
    processador: Processador,
    videoIntegrado: boolean,
    placaVideo?: PlacaVideo,
    armazenamento: Armazenamento,
    gabinete?: Gabinete,
    fonte: Fonte,
    memoriaRam: MemoriaRAM,
}

export default PC