/*
 * ==============================BEGIN_COPYRIGHT===============================
 * =======Wangluo Electronic Technology Co., LTD. PROPRIETARY INFORMATION======
 * This software and its associated IndoorStar products are supplied under the
 * terms of a license agreement or nondisclosure agreement (NDA) with Wangluo
 * Electronic Technology Co., LTD., Shanghai and may not be copied or disclosed
 * except in accordance with the terms of that agreement.
 * Copyright (c) 2013 - 2015
 * Wangluo Electronic Technology Co., LTD., Shanghai. All Rights Reserved.
 * ===============================END_COPYRIGHT================================
 *
 * @author - IDS R&D Group - Patrick Zhang
 * @date   - 2015-05-14 10:39
 */

package com.ids.model.dat.log;

import com.ids.model.log.OpItem;
import com.ids.model.map.RSSIRecord;
import com.ids.model.map.Track;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class UserLog implements Serializable {

  private static final long serialVersionUID = 6826198725134069073L;

  public static final byte MAGIC_OP             = 0x31;   // abandon
  public static final byte MAGIC_TRACK          = 0x32;
  public static final byte MAGIC_RSSI           = 0x33;
  public static final byte MAGIC_RSSI_BT        = 0x34;
  public static final byte MAGIC_RSSI_WIFI      = 0x35;
  public static final byte MAGIC_ADOP           = 0x36;
  public static final byte MAGIC_RSSI_WIFIANDBT = 0x61;
  public static final byte MAGIC_DATE_QUERY     = 0x62;
  public static final byte MAGIC_DATE_CONF      = 0x62;
  public static final byte MAGIC_BLENEWDATE     = 0x63;

  public static final byte MAGIC_USEROP         = 0x21;


  public static final byte MAGIC_DATA_ENCRYPT = 0x11;

  private UUID             usrSn;
  private byte             magicNm;
  private Date             logTime;
  private List<UserOp>     ops;    // abandon
  private List<Track>      tracks;
  private List<RSSIRecord> rssis;
  private List<OpItem>     opList; // new Op.
  
  public List<OpItem> getOpList() {
    return opList;
  }

  public void setOpList(List<OpItem> opList) {
    this.opList = opList;
  }

  public UUID getUsrSn() {
    return usrSn;
  }

  public void setUsrSn(UUID usrSn) {
    this.usrSn = usrSn;
  }

  public byte getMagicNm() {
    return magicNm;
  }

  public void setMagicNm(byte magicNm) {
    this.magicNm = magicNm;
  }

  public Date getLogTime() {
    return logTime;
  }

  public void setLogTime(Date logTime) {
    this.logTime = logTime;
  }

  public List<UserOp> getOps() {
    return ops;
  }

  public void setOps(List<UserOp> ops) {
    this.ops = ops;
  }

  public List<Track> getTracks() {
    return tracks;
  }

  public void setTracks(List<Track> tracks) {
    this.tracks = tracks;
  }

  public List<RSSIRecord> getRssis() {
    return rssis;
  }

  public void setRssis(List<RSSIRecord> rssis) {
    this.rssis = rssis;
  }

}
