import { NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { ChatKnowledge, chatKnowledgeApi } from '@/services/chatKnowledgeService';

export async function POST(req: Request) {
  try {
    const timestamp = new Date().getTime();
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file.name) {
      throw new Error("Arquivo não encontrado");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext) + '-' + timestamp;
    const newFileName = `${baseName}${ext}`;


    await fs.writeFile(`./public/uploads/${newFileName}`, buffer, (err) => {
      if (err) {
        throw new Error("Erro ao gravar o arquivo");
      }
    });

    const chatKnowledge = {
      id: 0,
      chat_id: 1,
      file_link: `uploads/${newFileName}`,
      file_name: newFileName,
      file_extension: ext,
      file_mime_type: 'teste'
    };

    await chatKnowledgeApi.create(chatKnowledge).catch(() => {throw new Error("Erro ao criar chat Knowledge")});

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}