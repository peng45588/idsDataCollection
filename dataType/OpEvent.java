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

public enum OpEvent {
  // 点击
  CLICK((short)1, "Click"), 
  DCLICK((short)2, "Double Click"), 
  IN((short)3, "In"), 
  OUT((short)4, "Out"), 
  
  // 拖动与缩放
  DRAG((short)20, "Drag"), 
  ZOOM_IN((short)21,"Zoom in"), 
  ZOOM_OUT((short)22, "Zoom out"), 
  
  // 特定动作
  SELECT((short)80,"Select"), 
  QUERY((short)81, "Query"), 
  RELOAD((short)82,"Reload"), 
  TRIGGER((short)83,"Trigger"),   // 触发
  SHAKE((short)84,"Shake"), 
  ENTER((short)85, "enter"),
  SHOW((short)86, "View"),
  CLOSE((short)87, "Close"),
 
  // 应用操作
  START((short)100, "Start"),
  STOP((short)101, "Stop"),
  PAUSE((short)101, "Pause"),
  RUN((short)101, "Run");
  
  
  
  private final short    value;
  private final String name;

  OpEvent(short value, String name) {
    this.value = value;
    this.name = name;
  }

  public short getValue() {
    return value;
  }

  public String getName() {
    return name;
  }

  public final static OpEvent get(short value) {
    for (int i = 0; i < values().length; i++) {
      if (values()[i].value == value) {
        return values()[i];
      }
    }
    return null;
  }

}
