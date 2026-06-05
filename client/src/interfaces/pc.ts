import { Armazenamento, Fonte, Gabinete, PlacaMae, PlacaVideo, Processador,MemoriaRAM, CategoriaPc } from "./componente"

interface PCComVideo {
    id: number,
    nome: string,
    placaMae: PlacaMae,
    processador: Processador,
    videoIntegrado: boolean,
    placaVideo?: PlacaVideo,
    armazenamento: Armazenamento,
    gabinete?: Gabinete,
    fonte: Fonte,
    memoriaRam: MemoriaRAM,
    valorTotal: number,
    categoria?: CategoriaPc
}

interface PCSemVideo{
    id: number,
    nome: string,
    placaMae: PlacaMae,
    processador: Processador,
    videoIntegrado: boolean,
    placaVideo: PlacaVideo,
    armazenamento: Armazenamento,
    gabinete?: Gabinete,
    fonte: Fonte,
    memoriaRam: MemoriaRAM,
    valorTotal: number,
    categoria?: CategoriaPc
}

type PC = PCComVideo | PCSemVideo
export default PC