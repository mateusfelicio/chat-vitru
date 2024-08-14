"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Divider, Col, Button, message, Upload, Spin, Flex, Row } from 'antd';
import type { UploadProps } from 'antd';
import { chatKnowledgeApi } from '@/services/chatKnowledgeService';
import { UploadOutlined } from '@ant-design/icons';
import { useMessage } from '@/components/messageContext';

const formStyle: React.CSSProperties = {
  maxWidth: 'none'
};

export default function ChatFileForm() {
  const [filesUploaded, setFilesUploaded] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { showMessage } = useMessage();

  function deleteFile(id: number) {
    chatKnowledgeApi.delete(id)
      .then(() => showMessage('Arquivo excluído com sucesso!', 'success'))
      .catch(() => showMessage('Erro ao excluír o arquivo!', 'error'));
  }

  useEffect(() => {
    chatKnowledgeApi.getAll().then((result) => {
      setFilesUploaded(result.map((chatKnowledge) => {
        return {
          uid: chatKnowledge.id,
          name: chatKnowledge.file_name,
          status: 'done',
          url: chatKnowledge.file_link
        };
      }));
      setLoading(false);
    }).catch((error) => {
      console.error("Erro ao carregar arquivos:", error);
      setLoading(false);
    });
  }, []);

  const props: UploadProps = {
    name: 'file',
    action: '/api/chat-knowledge-file-create',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: (file) => {
      deleteFile(Number(file.uid));
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
    defaultFileList: filesUploaded
  };

  return (
    <>
      {loading ? (
        <Col className='mt-2 mb-4' span={1} offset={11}><Spin size="large" /></Col>
      ) : (
        <Col span={24} className="mb-10">
          <Divider>Arquivos de conhecimento</Divider>
          <div className={"max-w-lg"}>
            <Upload {...props}>
              <Button className="mb-3" icon={<UploadOutlined />}>Upload de Arquivo</Button>
            </Upload>
          </div>
        </Col>
      )}
    </>
  );
}
