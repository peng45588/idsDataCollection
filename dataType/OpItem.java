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
package com.ids.model.log;

public final class OpItem {
  private short opEvent; // com.ids.mode.log.type.OpEvent
  private short opObject; // com.ids.mode.log.type.OpObject
  private long opId;
  private long opTime;
  
  public short getOpEvent() {
    return opEvent;
  }
  public void setOpEvent(short opEvent) {
    this.opEvent = opEvent;
  }
  public short getOpObject() {
    return opObject;
  }
  public void setOpObject(short opObject) {
    this.opObject = opObject;
  }
  public long getOpId() {
    return opId;
  }
  public void setOpId(long opId) {
    this.opId = opId;
  }
  public long getOpTime() {
    return opTime;
  }
  public void setOpTime(long opTime) {
    this.opTime = opTime;
  }
  
  public OpItem(short opEvent,short opObject,long opId,long opTime){
    setOpEvent(opEvent);
    setOpObject(opObject);
    setOpId(opId);
    setOpTime(opTime);
  }
  public OpItem(OpItem item){
    setOpEvent(item.getOpEvent());
    setOpObject(item.getOpObject());
    setOpId(item.getOpId());
    setOpTime(item.getOpTime());
  }
}
