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

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public class LogOpPkg implements Serializable {
  /**
   * 
   */
  private static final long serialVersionUID = -5549378153305446502L;
  private UUID uuid;// use mostSigBits first, if sn less than 64 bit.
  private long revTime; // receive time.
  private List<OpItem> opList;

  public UUID getUuid() {
    return uuid;
  }

  public void setUuid(UUID uuid) {
    this.uuid = uuid;
  }

  public List<OpItem> getOpList() {
    return opList;
  }

  public void setOpList(List<OpItem> opList) {
    this.opList = opList;
  }

  public long getRevTime() {
    return revTime;
  }

  public void setRevTime(long revTime) {
    this.revTime = revTime;
  }

}
