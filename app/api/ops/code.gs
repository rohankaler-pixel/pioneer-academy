const ADMIN_PASSCODE = "PIONEER2026";
const GRACE_MINUTES = 4;

function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let tSheet = ss.getSheetByName("Teachers");
  if (!tSheet) {
    tSheet = ss.insertSheet("Teachers");
    tSheet.appendRow(["Teacher_ID", "Full_Name", "Subject", "Phone", "PIN", "Active", "Device_ID"]);
    const initialTeachers = [
      ["SUMIT", "Mr. Sumit Yogi", "Biology (Zoology)", "919829000001", "1101", "YES", ""],
      ["VIKRAM", "Mr. Vikram Sir", "Biology (Botany)", "919829000002", "1102", "YES", ""],
      ["ABHISHEK", "Mr. Abhishek Sir", "Inorganic Chemistry", "919829000003", "1103", "YES", ""],
      ["RUDRA", "Mr. Rudra Sir", "Physics", "919829000004", "1104", "YES", ""],
      ["JAY", "Mr. Jai Dhaiya", "Organic Chemistry", "919829000005", "1105", "YES", ""],
      ["GIRISH", "Mr. Girish Sharma", "Physics (HOD)", "919829000006", "1106", "YES", ""],
      ["ASHISH", "Mr. Ashish Bissa", "Mathematics (HOD)", "919829000007", "1107", "YES", ""],
      ["DILIP", "Mr. Dilip Sir", "Hindi / English", "919829000008", "1108", "YES", ""],
      ["VIJAY", "Mr. Vijay Gopal Sir", "English / Hindi", "919829000009", "1109", "YES", ""]
    ];
    tSheet.getRange(2, 1, initialTeachers.length, 7).setValues(initialTeachers);
  }

  let sSheet = ss.getSheetByName("Timetable");
  if (!sSheet) {
    sSheet = ss.insertSheet("Timetable");
    sSheet.appendRow(["Slot_ID", "Days", "Room", "Batch", "Start_Time", "End_Time", "Teacher_ID", "Subject_Note"]);
    const initialSchedule = [
      ["LT3-1", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-3", "12th (H.M)", "08:00", "09:00", "SUMIT", "Zoology"],
      ["LT3-2", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-3", "12th (H.M)", "09:10", "10:00", "RUDRA", "Physics"],
      ["LT3-3", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-3", "12th (H.M)", "10:10", "11:00", "ABHISHEK", "Chemistry"],
      ["LT3-4", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-3", "12th (H.M)", "11:10", "12:00", "JAY", "Chemistry"],
      ["LT3-5", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-3", "12th (H.M)", "12:30", "13:30", "VIKRAM", "Biology"],
      ["LT3-6", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-3", "12th (H.M)", "13:40", "14:20", "DILIP", "Hindi"],
      ["LT3-7", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-3", "12th (H.M)", "14:20", "15:00", "VIJAY", "English"],
      ["LT5-1", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "08:00", "09:00", "VIKRAM", "Botany"],
      ["LT5-2", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "09:10", "10:00", "ABHISHEK", "Chemistry"],
      ["LT5-3", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "10:10", "11:00", "JAY", "Chemistry"],
      ["LT5-4", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "11:10", "12:00", "RUDRA", "Physics"],
      ["LT5-5", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "12:30", "13:30", "SUMIT", "Biology"],
      ["LT5-6", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "13:40", "14:20", "VIJAY", "English"],
      ["LT5-7", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "14:20", "15:00", "DILIP", "Hindi"],
      ["LT5-8", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-5", "12th (E.M)", "15:00", "16:00", "ABHISHEK", "Physics/Chem"],
      ["LT1-1", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-1", "Target", "08:00", "09:00", "ABHISHEK", "Chemistry"],
      ["LT1-2", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-1", "Target", "09:10", "10:00", "SUMIT", "Zoology"],
      ["LT1-3", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-1", "Target", "10:10", "11:00", "RUDRA", "Physics"],
      ["LT1-4", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-1", "Target", "11:10", "12:00", "VIKRAM", "Biology"],
      ["LT1-5", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-1", "Target", "12:30", "13:30", "JAY", "Chemistry"],
      ["LT1-6", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-1", "Target", "13:40", "15:00", "GIRISH", "Physics"],
      ["LT1-7", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-1", "Target", "15:00", "16:00", "GIRISH", "Physics/Chem"],
      ["LT2-1", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (E.M)", "10:10", "11:00", "VIKRAM", "Biology"],
      ["LT2-2", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (E.M)", "11:10", "12:00", "ABHISHEK", "Chemistry"],
      ["LT2-3", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (E.M)", "12:30", "13:30", "RUDRA", "Physics"],
      ["LT2-4", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (E.M)", "13:30", "14:20", "JAY", "Chemistry"],
      ["LT2-5", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (H.M)", "14:40", "15:30", "SUMIT", "Zoology"],
      ["LT2-6", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (H.M)", "15:40", "16:30", "VIKRAM", "Botany"],
      ["LT2-7", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (H.M)", "16:40", "17:30", "RUDRA", "Physics"],
      ["LT2-8", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (H.M)", "17:40", "18:25", "ABHISHEK", "Chemistry"],
      ["LT2-9", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-2", "11th (H.M)", "18:25", "19:20", "JAY", "Chemistry"],
      ["LT4-1", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-4", "11th (Maths)", "13:30", "14:30", "ASHISH", "Mathematics"],
      ["LT4-2", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-4", "11th (Maths)", "14:40", "15:30", "JAY", "Chemistry"],
      ["LT4-3", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-4", "11th (Maths)", "15:40", "16:30", "RUDRA", "Physics"],
      ["LT4-4", "Mon,Tue,Wed,Thu,Fri,Sat", "LT-4", "11th (Maths)", "16:40", "17:30", "ABHISHEK", "Chemistry"]
    ];
    sSheet.getRange(2, 1, initialSchedule.length, 8).setValues(initialSchedule);
  }

  let lSheet = ss.getSheetByName("Scan_Logs");
  if (!lSheet) {
    lSheet = ss.insertSheet("Scan_Logs");
    lSheet.appendRow([
      "Timestamp", "Date_Str", "Room", "Batch", "Slot_ID", "Scheduled_Start",
      "Scheduled_End", "Teacher_ID", "Teacher_Name", "Action_Type",
      "Actual_Time", "Delay_Mins", "Status", "Topic_DPP", "Distance_Meters", "Device_ID"
    ]);
  }
}

function getSheetDataAsObjects(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    setupDatabase();
    sheet = ss.getSheetByName(sheetName);
  }
  const rows = sheet.getDataRange().getDisplayValues();
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function doGet(e) {
  try {
    const params = (e && e.parameter) ? e.parameter : {};
    const action = params.action || "room_info";
    const teachers = getSheetDataAsObjects("Teachers").filter(t => t.Active === "YES");
    const timetable = getSheetDataAsObjects("Timetable");

    if (action === "room_info") {
      const room = params.room || "LT-1";
      const roomSlots = timetable.filter(s => s.Room === room);
      const safeTeachers = teachers.map(t => ({ id: t.Teacher_ID, name: t.Full_Name, subject: t.Subject }));
      return jsonResponse({ ok: true, room, slots: roomSlots, teachers: safeTeachers });
    }

    if (action === "dashboard") {
      if (params.key !== ADMIN_PASSCODE) {
        return jsonResponse({ ok: false, error: "Invalid Admin Passcode" });
      }
      const logs = getSheetDataAsObjects("Scan_Logs");
      return jsonResponse({
        ok: true,
        teachers: teachers.map(t => ({ id: t.Teacher_ID, name: t.Full_Name, subject: t.Subject })),
        timetable,
        logs: logs.reverse().slice(0, 500)
      });
    }

    return jsonResponse({ ok: false, error: "Unknown action" });
  } catch (err) {
    return jsonResponse({ ok: false, error: "Apps Script Error: " + err.toString() });
  }
}