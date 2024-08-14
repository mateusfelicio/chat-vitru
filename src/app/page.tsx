import Image from "next/image";
import React from 'react';
import { Carousel } from 'antd';
import { Flex, Progress } from 'antd';
import type { ProgressProps } from 'antd';
import Title from "antd/es/typography/Title";


export default function Home() {
  return (
    <div>
      <Title level={3}>Home</Title>
    </div>
  );
}
