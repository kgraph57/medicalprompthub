# レッスン2: Cursor IDEでの医療データ処理 - 効率的なコード生成

## 1. はじめに

医療データ処理は、診療、研究、データ分析など、様々な場面で必要になります。本レッスンでは、Cursor IDEのAI機能を活用して、医療データ処理のコードを効率的に生成する方法について詳しく学びます。

特に、CSVファイルの読み込み、データの前処理、統計計算など、医療現場でよく行う作業のコード生成方法を実践例を通じて理解します。

## 2. データ処理のコード生成

### コメントからコードを生成

Cursor IDEのAI機能は、コメントを書くことで、コードを自動生成できます。

**基本的な使い方：**

1. **コメントで意図を記述**: 何をしたいかをコメントで明確に記述
2. **AIがコードを生成**: AIがコメントからコードを生成
3. **生成コードを確認**: 生成されたコードを確認し、必要に応じて調整

**実際の例：CSVファイルの読み込み**

```
プロンプト例：

# 患者データをCSVファイルから読み込む関数を作成してください
# - ファイルパスを引数として受け取る
# - pandasを使用してCSVを読み込む
# - エラーハンドリングを含める（ファイルが存在しない場合など）
# - 関数名は load_patient_data
def load_patient_data(file_path):
    pass
```

**生成されるコード例：**

```python
import pandas as pd
import os

def load_patient_data(file_path):
    """
    患者データをCSVファイルから読み込む
    
    Args:
        file_path: CSVファイルのパス
        
    Returns:
        pandas.DataFrame: 患者データ
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"ファイルが見つかりません: {file_path}")
    
    try:
        data = pd.read_csv(file_path, encoding='utf-8')
        return data
    except Exception as e:
        raise ValueError(f"データの読み込みに失敗しました: {str(e)}")
```

### データフィルタリングのコード生成

データのフィルタリングも、コメントからコードを生成できます。

**実際の例：特定の条件でデータをフィルタリング**

```
プロンプト例：

# 患者データから、特定の条件に合致するデータを抽出する関数を作成してください
# - 患者データ（DataFrame）と条件を引数として受け取る
# - 条件の例：年齢が50歳以上、性別が男性など
# - フィルタリングされたデータを返す
# - 関数名は filter_patient_data
def filter_patient_data(data, conditions):
    pass
```

**生成されるコード例：**

```python
def filter_patient_data(data, conditions):
    """
    患者データから、特定の条件に合致するデータを抽出する
    
    Args:
        data: 患者データ（pandas.DataFrame）
        conditions: フィルタリング条件（辞書形式）
            例：{'age': {'>=': 50}, 'gender': 'M'}
        
    Returns:
        pandas.DataFrame: フィルタリングされたデータ
    """
    filtered_data = data.copy()
    
    for column, condition in conditions.items():
        if column not in filtered_data.columns:
            raise ValueError(f"列 '{column}' が存在しません")
        
        if isinstance(condition, dict):
            for operator, value in condition.items():
                if operator == '>=':
                    filtered_data = filtered_data[filtered_data[column] >= value]
                elif operator == '<=':
                    filtered_data = filtered_data[filtered_data[column] <= value]
                elif operator == '==':
                    filtered_data = filtered_data[filtered_data[column] == value]
                elif operator == '!=':
                    filtered_data = filtered_data[filtered_data[column] != value]
        else:
            filtered_data = filtered_data[filtered_data[column] == condition]
    
    return filtered_data

# 使用例
# conditions = {'age': {'>=': 50}, 'gender': 'M'}
# filtered = filter_patient_data(data, conditions)
```

### 統計計算のコード生成

統計計算も、コメントからコードを生成できます。

**実際の例：基本統計量の計算**

```
プロンプト例：

# 患者データの基本統計量を計算する関数を作成してください
# - 患者データ（DataFrame）と計算する列名のリストを引数として受け取る
# - 平均値、標準偏差、最小値、最大値、中央値を計算
# - 結果をDataFrame形式で返す
# - 関数名は calculate_statistics
def calculate_statistics(data, columns):
    pass
```

**生成されるコード例：**

```python
import pandas as pd
import numpy as np

def calculate_statistics(data, columns):
    """
    患者データの基本統計量を計算する
    
    Args:
        data: 患者データ（pandas.DataFrame）
        columns: 計算する列名のリスト
        
    Returns:
        pandas.DataFrame: 統計量の結果
    """
    results = []
    
    for column in columns:
        if column not in data.columns:
            raise ValueError(f"列 '{column}' が存在しません")
        
        col_data = data[column].dropna()
        
        if len(col_data) == 0:
            continue
        
        stats = {
            '列名': column,
            '平均値': col_data.mean(),
            '標準偏差': col_data.std(),
            '最小値': col_data.min(),
            '最大値': col_data.max(),
            '中央値': col_data.median(),
            'サンプル数': len(col_data)
        }
        results.append(stats)
    
    return pd.DataFrame(results)

# 使用例
# columns = ['age', 'glucose', 'hba1c']
# stats = calculate_statistics(data, columns)
```

## 3. データ前処理のコード生成

### 欠損値処理のコード生成

医療データでは、欠損値がよく発生します。欠損値処理のコードも生成できます。

**実際の例：欠損値の処理**

```
プロンプト例：

# 患者データの欠損値を処理する関数を作成してください
# - 患者データ（DataFrame）と処理方法を引数として受け取る
# - 処理方法の例：
#   - 'drop': 欠損値のある行を削除
#   - 'mean': 平均値で補完
#   - 'median': 中央値で補完
#   - 'forward': 前の値で補完
# - 処理後のデータを返す
# - 関数名は handle_missing_values
def handle_missing_values(data, method='drop'):
    pass
```

**生成されるコード例：**

```python
def handle_missing_values(data, method='drop'):
    """
    患者データの欠損値を処理する
    
    Args:
        data: 患者データ（pandas.DataFrame）
        method: 処理方法
            - 'drop': 欠損値のある行を削除
            - 'mean': 平均値で補完（数値列のみ）
            - 'median': 中央値で補完（数値列のみ）
            - 'forward': 前の値で補完
            - 'backward': 後の値で補完
        
    Returns:
        pandas.DataFrame: 処理後のデータ
    """
    processed_data = data.copy()
    
    if method == 'drop':
        processed_data = processed_data.dropna()
    elif method == 'mean':
        numeric_columns = processed_data.select_dtypes(include=[np.number]).columns
        processed_data[numeric_columns] = processed_data[numeric_columns].fillna(
            processed_data[numeric_columns].mean()
        )
    elif method == 'median':
        numeric_columns = processed_data.select_dtypes(include=[np.number]).columns
        processed_data[numeric_columns] = processed_data[numeric_columns].fillna(
            processed_data[numeric_columns].median()
        )
    elif method == 'forward':
        processed_data = processed_data.fillna(method='ffill')
    elif method == 'backward':
        processed_data = processed_data.fillna(method='bfill')
    else:
        raise ValueError(f"未知の処理方法: {method}")
    
    return processed_data

# 使用例
# processed_data = handle_missing_values(data, method='mean')
```

### 異常値処理のコード生成

異常値の処理も、コメントからコードを生成できます。

**実際の例：異常値の検出と処理**

```
プロンプト例：

# 患者データから異常値を検出し、処理する関数を作成してください
# - 患者データ（DataFrame）と列名を引数として受け取る
# - 異常値の検出方法：IQR（四分位範囲）を使用
# - 異常値を外れ値として検出
# - 処理方法の選択：
#   - 'remove': 異常値を削除
#   - 'clip': 異常値を範囲内にクリップ
# - 処理後のデータを返す
# - 関数名は handle_outliers
def handle_outliers(data, column, method='remove'):
    pass
```

**生成されるコード例：**

```python
def handle_outliers(data, column, method='remove'):
    """
    患者データから異常値を検出し、処理する
    
    Args:
        data: 患者データ（pandas.DataFrame）
        column: 対象の列名
        method: 処理方法
            - 'remove': 異常値を削除
            - 'clip': 異常値を範囲内にクリップ
        
    Returns:
        pandas.DataFrame: 処理後のデータ
    """
    if column not in data.columns:
        raise ValueError(f"列 '{column}' が存在しません")
    
    col_data = data[column].dropna()
    
    # IQR法で異常値を検出
    Q1 = col_data.quantile(0.25)
    Q3 = col_data.quantile(0.75)
    IQR = Q3 - Q1
    
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    processed_data = data.copy()
    
    if method == 'remove':
        # 異常値を削除
        processed_data = processed_data[
            (processed_data[column] >= lower_bound) &
            (processed_data[column] <= upper_bound)
        ]
    elif method == 'clip':
        # 異常値を範囲内にクリップ
        processed_data[column] = processed_data[column].clip(
            lower=lower_bound, upper=upper_bound
        )
    else:
        raise ValueError(f"未知の処理方法: {method}")
    
    return processed_data

# 使用例
# processed_data = handle_outliers(data, column='glucose', method='clip')
```

## 4. データ可視化のコード生成

### グラフ作成のコード生成

データ可視化のコードも、コメントから生成できます。

**実際の例：時系列グラフの作成**

```
プロンプト例：

# 患者データの時系列グラフを作成する関数を作成してください
# - 患者データ（DataFrame）、日付列、値の列を引数として受け取る
# - matplotlibを使用して折れ線グラフを作成
# - グラフのタイトル、軸ラベルを日本語で表示
# - グラフをファイルに保存する機能も含める
# - 関数名は plot_time_series
def plot_time_series(data, date_column, value_column, title='時系列グラフ'):
    pass
```

**生成されるコード例：**

```python
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from datetime import datetime

def plot_time_series(data, date_column, value_column, title='時系列グラフ'):
    """
    患者データの時系列グラフを作成する
    
    Args:
        data: 患者データ（pandas.DataFrame）
        date_column: 日付の列名
        value_column: 値の列名
        title: グラフのタイトル
    """
    # 日付列をdatetime型に変換
    data[date_column] = pd.to_datetime(data[date_column])
    data = data.sort_values(date_column)
    
    # グラフの作成
    fig, ax = plt.subplots(figsize=(10, 6))
    
    ax.plot(data[date_column], data[value_column], marker='o', linewidth=2)
    
    # ラベルとタイトル
    ax.set_xlabel('日付', fontsize=12)
    ax.set_ylabel(value_column, fontsize=12)
    ax.set_title(title, fontsize=14, fontweight='bold')
    
    # 日付のフォーマット
    ax.xaxis.set_major_formatter(mdates.DateFormatter('%Y-%m-%d'))
    ax.xaxis.set_major_locator(mdates.DayLocator(interval=7))
    plt.xticks(rotation=45)
    
    # グリッドの表示
    ax.grid(True, alpha=0.3)
    
    plt.tight_layout()
    
    # ファイルに保存
    filename = f'{title.replace(" ", "_")}.png'
    plt.savefig(filename, dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"グラフを保存しました: {filename}")

# 使用例
# plot_time_series(data, date_column='date', value_column='glucose', title='血糖値の推移')
```

## 5. 実践的なワークフロー

### データ処理パイプラインの構築

複数の処理を組み合わせて、データ処理パイプラインを構築できます。

**実際の例：医療データ処理パイプライン**

```
プロンプト例：

# 医療データ処理パイプラインを作成してください
# 1. CSVファイルからデータを読み込む
# 2. 欠損値を平均値で補完
# 3. 異常値をクリップ
# 4. 特定の条件でフィルタリング（年齢50歳以上）
# 5. 基本統計量を計算
# 6. 結果をCSVファイルに保存

# すべての処理を1つの関数で実行できるようにしてください
# 関数名は process_medical_data
def process_medical_data(input_file, output_file):
    pass
```

**生成されるコード例：**

```python
def process_medical_data(input_file, output_file):
    """
    医療データ処理パイプラインを実行する
    
    Args:
        input_file: 入力CSVファイルのパス
        output_file: 出力CSVファイルのパス
    """
    # 1. データの読み込み
    print("データを読み込んでいます...")
    data = load_patient_data(input_file)
    print(f"読み込み完了: {len(data)}行")
    
    # 2. 欠損値の処理
    print("欠損値を処理しています...")
    data = handle_missing_values(data, method='mean')
    print(f"処理後: {len(data)}行")
    
    # 3. 異常値の処理（年齢と血糖値）
    if 'age' in data.columns:
        print("異常値（年齢）を処理しています...")
        data = handle_outliers(data, column='age', method='clip')
    
    if 'glucose' in data.columns:
        print("異常値（血糖値）を処理しています...")
        data = handle_outliers(data, column='glucose', method='clip')
    
    # 4. フィルタリング（年齢50歳以上）
    if 'age' in data.columns:
        print("年齢50歳以上でフィルタリングしています...")
        data = filter_patient_data(data, {'age': {'>=': 50}})
        print(f"フィルタリング後: {len(data)}行")
    
    # 5. 基本統計量の計算
    print("基本統計量を計算しています...")
    numeric_columns = data.select_dtypes(include=[np.number]).columns.tolist()
    if numeric_columns:
        stats = calculate_statistics(data, numeric_columns)
        print("\n基本統計量:")
        print(stats)
    
    # 6. 結果を保存
    print(f"結果を保存しています: {output_file}")
    data.to_csv(output_file, index=False, encoding='utf-8-sig')
    print("処理完了！")

# 使用例
# process_medical_data('input.csv', 'output.csv')
```

## 6. まとめ

本レッスンでは、Cursor IDEでの医療データ処理について学びました。コメントからコードを生成する方法、データの前処理、統計計算、データ可視化などの実践例を通じて、効率的なコード生成方法を理解しました。

Cursor IDEのAI機能を適切に活用することで、医療データ処理のコードを効率的に生成できます。特に、コメントで明確に意図を記述することで、より適切なコードが生成されます。

次のレッスンでは、機械学習コードの生成とデバッグについて詳しく学びます。医療AIモデルの構築方法を理解していきましょう。

---

### 参考資料

- [Cursor IDE Documentation](https://cursor.sh/docs): Cursor IDEの公式ドキュメント
- [Pandas Documentation](https://pandas.pydata.org/docs/): pandasの公式ドキュメント
- [Matplotlib Documentation](https://matplotlib.org/stable/contents.html): matplotlibの公式ドキュメント
