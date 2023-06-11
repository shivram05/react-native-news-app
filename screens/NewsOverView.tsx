import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ComponentNavigationProps } from '../utils/types'
import DetailsCard from '../components/DetailsCard'

const NewsOverView = (props:ComponentNavigationProps) => {

  const {title,content,image_url} = props?.route?.params
  return (
    <DetailsCard content={content} image_url={image_url} title={title} />
  )
}

export default NewsOverView

const styles = StyleSheet.create({})