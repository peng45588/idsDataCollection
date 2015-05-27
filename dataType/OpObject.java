/*
 * ==============================BEGIN_COPYRIGHT===============================
 * =======Wangluo Electronic Technology Co., LTD. PROPRIETARY INFORMATION======
 * This software and its associated IndoorStar products are supplied under the
 * terms of a license agreement or nondisclosure agreement (NDA) with Wangluo
 * Electronic Technology Co., LTD., Shanghai and may not be copied or disclosed
 * except in accordance with the terms of that agreement.
 * Copyright (c) 2014 - 2017
 * Wangluo Electronic Technology Co., LTD., Shanghai. All Rights Reserved.
 * ===============================END_COPYRIGHT================================
 *
 * @author - IDS R&D Group - xgq
 * @date   -
 */

package com.ids.model.log.type;

public enum OpObject {
  // 商场相关
  MALLID((short)1, "MallId"), 
  FLOORID((short)2, "FloorId"), 
  SHOPID((short)3, "ShopId"), 
  
  // 坐标相关
  AXISXY((short)20, "Axis X AND Y"),   //连同上述商场信息 等同track坐标描述
  
  // program
  APP((short)25, "APP ID"),
  WEBID((short)26, "Web Id"),
  BEACON((short)27, "Beacon"),
  REGION((short)28, "Beacon"),
  
  // 界面元素
  BUTTON((short)30, "Button"), 
  IMG((short)31,"IMG"), 
  WINDOW((short)32, "Window"), 
  MENU((short)32, "Menu"), 
  
  MOBILE((short)201, "Dev Mobile");
  
  private final short    value;
  private final String name;

  OpObject(short value, String name) {
    this.value = value;
    this.name = name;
  }

  public short getValue() {
    return value;
  }

  public String getName() {
    return name;
  }

  public final static OpObject get(short value) {
    for (int i = 0; i < values().length; i++) {
      if (values()[i].value == value) {
        return values()[i];
      }
    }
    return null;
  }

}
